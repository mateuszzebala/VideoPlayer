import datetime

from django.urls import reverse

from Panel.utils import render
from django.http import FileResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login as login_user, logout as logout_user
from .models import AccountImage
from django.middleware.csrf import get_token
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

import json

def httpcode(request, code=200, message=""):
    return JsonResponse({
        "code":code,
        "message":message
    }, status=code)

def image(request, id):
    user = User.objects.filter(id=id).first()
    img = AccountImage.objects.filter(user=user).first()
    file = ""
    if img is None:
        file = "Media/account_images/default.jpg"
    else:
        file = img.image.path

    if user is not None:
        return FileResponse(open(file, 'rb'))

@csrf_exempt
def csrf(request):
    return JsonResponse({
        "token": get_token(request)
    })

def account(request):
    return render(request, "account.html", {})


def me(request):
    if request.user.is_authenticated:
        return JsonResponse({
            "login":True,
            "first_name":request.user.first_name,
            "last_name":request.user.last_name,
            "username":request.user.username,
            "email":request.user.email,
            "image":reverse("Account:image", kwargs={"id":request.user.id}),
            "superuser":request.user.is_superuser,
            "date_joined":request.user.date_joined,
            "staff":request.user.is_staff,
            "active":request.user.is_active,
            "last_login":request.user.last_login,
            "datetime":datetime.datetime.now()
        })
    else:
        return httpcode(request, 200, "You are not logged in")

@require_http_methods(['POST'])
def login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        login_user(request, user)
        return httpcode(request, 200, "Login successful")
    else:
        return httpcode(request, 200, "Bad data")

def register(request):
    ...