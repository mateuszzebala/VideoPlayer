from django.db import models
from django.contrib.auth.models import User
from Panel.config import register_model
import os
import string
import random

def image_name(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{''.join(random.choices(string.ascii_lowercase, k=20))}.{ext}"
    return os.path.join('Media/video/', filename)

class Image(models.Model):
    image = models.ImageField(upload_to=image_name)

    def __str__(self):
        return f"{self.image.name}"


class MainImage(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.image)


class BgImage(models.Model):
    image = models.ForeignKey(Image, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.image)


class Country(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

    def __repr__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

class Actor(models.Model):
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Genre(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

class Producer(models.Model):
    name = models.CharField(max_length=32)

    def __str__(self):
        return self.name

class Video(models.Model):
    genres = models.ManyToManyField(Genre)
    actors = models.ManyToManyField(Actor)
    coutries = models.ManyToManyField(Country)
    producers = models.ManyToManyField(Producer)
    series = models.BooleanField()
    url = models.CharField(max_length=1024, null=True, blank=True)
    title = models.CharField(max_length=128)
    main_image = models.ForeignKey(MainImage, on_delete=models.CASCADE)
    bg_image = models.ForeignKey(BgImage, on_delete=models.CASCADE)
    release_date = models.DateField()
    duration = models.FloatField()
    trailer_yt_url = models.CharField(max_length=128)
    tags = models.ManyToManyField(Tag)
    imdb_url = models.CharField(max_length=128)
    like = models.IntegerField(default=0)
    dislike = models.IntegerField(default=0)
    description = models.TextField()

    def __str__(self):
        return self.title

    def get_countries_json(self):
        res = {}
        countries = self.coutries.all()
        for i in range(len(countries)):
            res[countries[i].id] = countries[i].name
        return res

    def get_actors_json(self):
        res = {}
        actors = self.actors.all()
        for i in range(len(actors)):
            res[actors[i].id] = str(actors[i])
        return res

    def get_genres_json(self):
        res = {}
        genres = self.genres.all()
        for i in range(len(genres)):
            res[genres[i].id] = genres[i].name
        return res

    def get_producers_json(self):
        res = {}
        producers = self.producers.all()
        for i in range(len(producers)):
            res[producers[i].id] = producers[i].name
        return res


    def json(self):
        seasons_episodes = {}
        for season in Season.objects.filter(series=self):
            seasons_episodes[season.number] = {}
            for episode in Episode.objects.filter(season=season):
                seasons_episodes[season.number][episode.number] = episode.json()

        return {
            "id":self.id,
            "title": self.title,
            "description": self.description,
            "series": self.series,
            "url":self.url,
            "main_image":self.main_image.image.id,
            "bg_image":self.bg_image.image.id,
            "seasons":seasons_episodes,
            "like": self.like,
            "dislike": self.dislike,
            "youtube":self.trailer_yt_url,
            "imdb":self.imdb_url,
            "duration":self.duration,
            "release_date":self.release_date,
            "countries":self.get_countries_json(),
            "actors":self.get_actors_json(),
            "genres":self.get_genres_json(),
            "producers":self.get_producers_json(),
        }

class Season(models.Model):
    series = models.ForeignKey(Video, on_delete=models.CASCADE)
    number = models.IntegerField()

    def __str__(self):
        return f"{self.series.title} - Season {self.number}"

class Episode(models.Model):
    season = models.ForeignKey(Season, on_delete=models.CASCADE)
    number = models.IntegerField()
    title = models.CharField(max_length=32)
    url = models.CharField(max_length=1024)

    def json(self):
        return {
            'title': self.title,
            'url': self.url
        }

register_model(Country, ('id', 'name'))
register_model(Image, ('id', 'image'))
register_model(MainImage, ('id', 'image'))
register_model(BgImage, ('id', 'image'))
register_model(Tag, ('id', 'name'))
register_model(Actor, ('id', 'first_name', 'last_name'))
register_model(Genre, ('id', 'name'))
register_model(Producer, ('id', 'name'))
register_model(Video, ('id', 'title', 'series'))
register_model(Season, ('id', 'series', 'number'))
register_model(Episode, ('id', 'season', 'number', 'title'))
