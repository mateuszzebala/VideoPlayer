
from . import views
from django.urls import path

app_name = 'Main'

urlpatterns = [
    path('video/<id>', views.video, name="video"),
    path('search/<string>', views.search, name="search"),
    path('image/<id>', views.image, name="image"),
    path('best/', views.best, name="best"),
    path('genre/<id>', views.genre, name="genre"),
    path('producer/<id>', views.producer, name="producer"),
    path('country/<id>', views.country, name="country"),
    path('actor/<id>', views.actor, name="actor"),
]
