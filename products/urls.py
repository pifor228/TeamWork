
from django.urls import path
from .views import MovieCreateView

urlpatterns = [
    path('movies/', MovieCreateView.as_view()),
]