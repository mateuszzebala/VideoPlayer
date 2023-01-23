from django.db import models
from django.contrib.auth.models import User
from Panel.config import register_model
from django.contrib.sessions.models import Session
import os

class AccountImage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='Media/account_images/')
    datetime = models.DateTimeField(auto_now_add=True)

class View(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    method = models.CharField(max_length=10, null=True, blank=True, default=None)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, null=True, blank=True)
    ip_v4 = models.CharField(max_length=20, null=True, blank=True)
    url = models.CharField(max_length=100)
    datetime = models.DateTimeField(auto_now_add=True)

class LastView(models.Model):
    view = models.ForeignKey(View, on_delete=models.SET_NULL, null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    datetime = models.DateTimeField()

class Visit(models.Model):
    view = models.ForeignKey(View, on_delete=models.SET_NULL, null=True, blank=True)
    session = models.ForeignKey(Session, on_delete=models.CASCADE, null=True, blank=True)
    date = models.DateField(auto_now_add=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)


register_model(AccountImage, ("id", "user", "datetime"))
register_model(LastView, ("id", "user", "datetime"))
register_model(Visit, ("id", "date", "session", "user"))
register_model(View, ("id", "datetime", "user", "ip_v4"))

