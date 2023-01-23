
from . import views
from django.urls import path
from Panel.config import register_page

app_name = 'Account'

urlpatterns = [
    path('image/<id>', views.image, name="image"),
    path('csrf/', views.csrf, name="csrf"),
    path('me/', views.me, name="me"),
    path('login/', views.login, name="login"),
    path('register/', views.register, name="register"),
]
