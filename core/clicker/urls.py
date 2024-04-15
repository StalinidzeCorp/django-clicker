from django.urls import path
from . import views

urlpatterns = [
    path('call_click/', views.call_click),
]
