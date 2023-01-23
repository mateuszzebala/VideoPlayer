import datetime
import os

from django.shortcuts import render

from Account.models import View, Visit
from .config import registered_pages


def is_binary(pth):
    fin = open(pth, 'rb')
    if os.stat(pth).st_size == 0:
        return False
    try:
        CHUNKSIZE = 1024
        while True:
            chunk = fin.read(CHUNKSIZE)
            if b'\0' in chunk:
                return True
            if len(chunk) < CHUNKSIZE:
                break
    finally:
        fin.close()
    return False


def type_of_file(pth):
    ext = os.path.basename(pth).split('.')[-1].lower()
    if ext in ['mp3', 'flac', 'wav', 'wma', 'aac', 'm4a']:
        return 'music'
    if ext in ['png', 'jpg', 'jpeg', 'apng', 'avif', 'gif', 'webp']:
        return 'image'
    if ext in ['mp4', 'mov', 'wmv']:
        return 'video'
    if ext in ['py', 'cpp', 'cs', 'php', 'js', 'html', 'go', 'java', 'css', 'c', 'kt', 'swift', 'ts', 'rb', 'dart', 'json', 'sh']:
        return 'code'
    if ext in ['exe']:
        return 'run'
    if ext in ['sql', 'sqlite', 'sqlite3', 'db']:
        return 'database'
    else:
        return 'file'



def get_last_days_visits(l):
    last_days = {}

    for i in range(l, -1, -1):
        day = datetime.date.today() - datetime.timedelta(days=i)
        last_days[day.strftime("%d - %m")] = len(Visit.objects.filter(date=day))

    ld = {}
    for key, val in last_days.items():
        if last_days[key] != 0:
            ld[key] = val


    return ld

def get_last_days_number_of_requests(l):
    last_days = {}

    for i in range(l, -1, -1):
        day = datetime.date.today() - datetime.timedelta(days=i)
        last_days[day.strftime("%d - %m")] = len(View.objects.filter(datetime__year=day.year, datetime__day=day.day, datetime__month=day.month))

    ld = {}
    for key, val in last_days.items():
        if last_days[key] != 0:
            ld[key] = val


    return ld


_render = render
def render(request, template, args={}, content_type=None, using=None, status=None):
    args["registered_pages"] = registered_pages
    return _render(request, template, args, content_type=content_type, using=using, status=status)
