from django.contrib.auth.models import User, Group, Permission, ContentType
from django.contrib.sessions.models import Session


registered_models = [
    (Group, ("id", "name")),
    (User, ("id", "username", "email", "first_name", "last_name")),

    (Session, ("session_key",)),
]

registered_pages = []


def register_model(model, tpl):
    registered_models.append((model, tpl))


def register_page(url, name, icon):
    registered_pages.append({
        "name":name,
        "icon":icon,
        "url":url,
    })


