from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.user_login.as_view(), name='login'),
    path('logout/', views.user_logout.as_view()),
    path('register/', views.user_register.as_view(), name='register'),
    path('users/<int:pk>/', views.UserDetail.as_view()),
]