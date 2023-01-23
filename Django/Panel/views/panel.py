import platform
import sys

from django.conf import settings as djangoSettings
from django.contrib.auth import login as login_user, authenticate
from django.contrib.auth.models import User
from django.contrib.sessions.models import Session
from django.http import FileResponse
from django.shortcuts import redirect

from Main.views import httpcode
from Account.models import LastView
from Panel.config import registered_models

from Panel.utils import *
from Panel.utils import render


def is_superuser(fnc):
    def inner(*args, **kwargs):
        request = args[0]
        if request.user.is_superuser:
            return fnc(*args, **kwargs)
        else:
            return redirect("Panel:login")

    return inner

@is_superuser
def httpcode(request, code=200, message=""):
    if not request.user.is_superuser: return redirect("Panel:login")
    return render(request, "Panel/Pages/httpcode.html", {"code":code, "message":message}, status=int(code))

@is_superuser
def home(request):
    widgets = []
    now = datetime.datetime.now()
    day = datetime.timedelta(days=1)
    day = len(LastView.objects.filter(datetime__gt=now - day))
    week = datetime.timedelta(days=7)
    week = len(LastView.objects.filter(datetime__gt=now - week))
    month =datetime.timedelta(days=30)
    month = len(LastView.objects.filter(datetime__gt=now - month))
    year = datetime.timedelta(days=365)
    year = len(LastView.objects.filter(datetime__gt=now - year))

    system_info = {
        "Machine": platform.machine(),
        "System": platform.system(),
        "Name": platform.uname().node,
        "Debug": "ON" if djangoSettings.DEBUG else "OFF",
        "Python": sys.version.split(" ")[0],
    }

    widgets.append({
        "id": 0,
        "type": "doughnut",
        "title": "Active users",
        "height": 300,
        "labels": {"day": day, "week": week, "month": month, "year": year}
    })

    widgets.append({
        "id": 1,
        "type": "line",
        "title": "Visits",
        "height": 300,
        "width":600,
        "labels": get_last_days_visits(10)
    })
    widgets.append({
        "id": 2,
        "type": "bar",
        "title": "Views",
        "height": 300,
        "width": 600,
        "labels": get_last_days_number_of_requests(10)
    })

    return render(request, "Panel/Pages/home.html", {
        "widgets":widgets,
        "system_info":system_info,
    })



@is_superuser
def settings(request):
    if request.method == "POST":
        content = request.POST.get("content").encode()
        with open("Django" + os.sep + "settings.py", "wb") as file:
            file.write(content)
    with open("Django" + os.sep + "settings.py", "r") as file:
        return render(request, "Panel/Pages/settings.html", {
            "content": "".join(file.readlines())
        })



def get_app_models():
    mdls = {}
    for model, fields in registered_models:
        if mdls.get(model._meta.app_label) is None:
            mdls[model._meta.app_label] = []
        mdls[model._meta.app_label].append(model.__name__)
        
    return mdls

def get_model_names():
    names = []
    for model, fields in registered_models:
        names.append(model.__name__)
    return names



def login(request):
    if request.user.is_superuser:
        return redirect('Panel:home')
    if request.method == "POST":
        username = request.POST.get('username')
        password = request.POST.get('password')
        if username is not None and password is not None:
            user = authenticate(username=username, password=password)
            if user is None:
                return render(request, 'Panel/login.html', {"bad_data":True})
            else:
                login_user(request, user)
                return redirect('Panel:home')


    return render(request, 'Panel/login.html', {})

@is_superuser
def logout_user(request, id):
    user = User.objects.filter(id=id).first()
    if user is not None:
        sessions = Session.objects.all()
        for session in sessions:
            if int(session.get_decoded().get('_auth_user_id')) == user.id:
                session.delete()

    return redirect("Panel:users-user", id=id)


@is_superuser
def local_file(request):
    if request.GET.get("p") is not None:
        try:
            return FileResponse(open(request.GET.get("p"), "rb"))
            res = redirect("Panel:editor-file")
            res['Location'] += f"?p={request.GET.get('p')}"
            return res
        except FileNotFoundError:
            return httpcode(request, 404, "File does not exist")
    else:
        return httpcode(request, 404, "File does not exist")
