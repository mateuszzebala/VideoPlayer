from django.utils.timezone import now
import datetime
from .models import LastView, Visit, View
from django.contrib.sessions.models import Session
from django.conf import settings as djangoSettings

def get_client_ip_address(request):
    req_headers = request.META
    x_forwarded_for_value = req_headers.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for_value:
        ip_addr = x_forwarded_for_value.split(',')[-1].strip()
    else:
        ip_addr = req_headers.get('REMOTE_ADDR')
    return ip_addr

class VisitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not djangoSettings.SAVE_VISITS:
            response = self.get_response(request)
            return response

        session = Session.objects.filter(session_key=request.session.session_key).first()
        todayvisit_exist = Visit.objects.filter(session=session, date=datetime.date.today()).first() is not None
        user = None
        visit = None
        view = None
        if request.user.is_authenticated:
            user = request.user


        view = View(session=session, user=user, ip_v4=get_client_ip_address(request), url=request.build_absolute_uri())
        view.save()

        if not todayvisit_exist:
            visit = Visit(session=session, date=datetime.date.today(), user=user, view=view)
            visit.save()

        if user is not None:
            last_see = LastView.objects.filter(user=request.user).first()
            if last_see is None:
                last_see = LastView(user=request.user, datetime=now(), view=view)
            last_see.datetime=now()
            last_see.save()

        response = self.get_response(request)
        return response