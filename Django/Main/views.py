from math import ceil

from django.shortcuts import render
from django.http import JsonResponse, FileResponse
from .models import MainImage, Video, BgImage, Image, Genre, Producer, Country, Actor


def httpcode(request, code=200, message=""):
    return render(request, "Main/httpcode.html", {"code":code, "message":message}, status=int(code))

def video(request, id):
    video = Video.objects.filter(id=id).first()
    if video is not None:
        return JsonResponse(video.json())
    else:
        return httpcode(request, 404, "Video doesn't exist")


def search(request, string):
    videos = Video.objects.filter(title__contains=string)
    res = {}
    for i in range(len(videos)):
        res[i] = videos[i].json()
    return JsonResponse(res)

def image(request, id):
    image = Image.objects.filter(id=id).first()
    return FileResponse(open(image.image.path, "rb"))

def best(request):
    n = request.GET.get('n')
    p = request.GET.get('p')
    o = request.GET.get('o')
    a = request.GET.get('a')
    n = 1 if n is None else int(n)
    p = 1 if p is None else int(p)
    o = '' if o is None else o
    a = 'a' if a is None else a
    videos = None
    vids = {'videos':{}}
    if o != '':
        videos = Video.objects.filter().order_by(o)
    else:
        videos = Video.objects.filter()
    vids['meta'] = {
        "pages": ceil(len(videos) / n) if n != 0 else 1,
        "reverse": a == 'd',
        "order_by": o if o != '' else False,
        "page": p,
        "rows": n,
    }
    if a == 'd':
        videos = videos.reverse()
    if n != 0:
        videos = videos[1*p-1 : n*p]
    for i in range(len(videos)):
        vids['videos'][i] = videos[i].json()

    return JsonResponse(vids)

def genre(request, id):
    gen = Genre.objects.filter(id=id).first()
    n = request.GET.get('n')
    p = request.GET.get('p')
    n = 1 if n is None else int(n)
    p = 1 if p is None else int(p)
    videos = Video.objects.filter(genres__in=[gen])
    if n != 0:
        videos = videos[1*p-1 : n*p]

    vids = {'videos':{}, 'meta':{
        'pages':ceil(len(videos) / n) if n != 0 else 1,
    }}
    for i in range(len(videos)):
        vids['videos'][i] = videos[i].json()
    return JsonResponse(vids)

def producer(request, id):
    pro = Producer.objects.filter(id=id).first()
    n = request.GET.get('n')
    p = request.GET.get('p')
    n = 1 if n is None else int(n)
    p = 1 if p is None else int(p)
    videos = Video.objects.filter(producers__in=[pro])
    if n != 0:
        videos = videos[1*p-1 : n*p]

    vids = {'videos':{}, 'meta':{
        'pages':ceil(len(videos) / n) if n != 0 else 1,
    }}
    for i in range(len(videos)):
        vids['videos'][i] = videos[i].json()
    return JsonResponse(vids)

def country(request, id):
    cou = Country.objects.filter(id=id).first()
    n = request.GET.get('n')
    p = request.GET.get('p')
    n = 1 if n is None else int(n)
    p = 1 if p is None else int(p)
    videos = Video.objects.filter(coutries__in=[cou])
    if n != 0:
        videos = videos[1*p-1 : n*p]

    vids = {'videos':{}, 'meta':{
        'pages':ceil(len(videos) / n) if n != 0 else 1,
    }}
    for i in range(len(videos)):
        vids['videos'][i] = videos[i].json()
    return JsonResponse(vids)

def actor(request, id):
    act = Actor.objects.filter(id=id).first()
    n = request.GET.get('n')
    p = request.GET.get('p')
    n = 1 if n is None else int(n)
    p = 1 if p is None else int(p)
    videos = Video.objects.filter(actors__in=[act])
    if n != 0:
        videos = videos[1*p-1 : n*p]

    vids = {'videos':{}, 'meta':{
        'pages':ceil(len(videos) / n) if n != 0 else 1,
    }}
    for i in range(len(videos)):
        vids['videos'][i] = videos[i].json()
    return JsonResponse(vids)







