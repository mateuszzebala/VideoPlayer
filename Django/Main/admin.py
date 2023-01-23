from django.contrib import admin
from django.contrib.sessions.models import Session
from .models import Genre, Actor, Episode, Season, Country, Producer, Tag, Video, Image

@admin.register(Session)
class SessionAdmin(admin.ModelAdmin):
    ...

admin.site.register(Genre)
admin.site.register(Actor)
admin.site.register(Episode)
admin.site.register(Season)
admin.site.register(Country)
admin.site.register(Producer)
admin.site.register(Tag)
admin.site.register(Video)
admin.site.register(Image)