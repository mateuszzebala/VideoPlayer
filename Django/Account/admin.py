from django.contrib import admin
from .models import AccountImage, Visit, View, LastView

@admin.register(AccountImage)
class AccountImageAdmin(admin.ModelAdmin):
    list_display = ['user', 'image', 'datetime']

@admin.register(LastView)
class LastViewAdmin(admin.ModelAdmin):
    list_display = ['user', 'datetime']

@admin.register(Visit)
class VisitAdmin(admin.ModelAdmin):
    list_display = ['date', 'user']

@admin.register(View)
class VisitAdmin(admin.ModelAdmin):
    list_display = ["id", "datetime", "user", "ip_v4", "url"]