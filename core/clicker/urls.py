from django.urls import path
from . import views

urlpatterns = [
    path('call_click/', views.call_click),
    path('boosts/', views.BoostViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('boost/<int:pk>/', views.BoostViewSet.as_view({'put': 'partial_update'})),
    path('update_coins/', views.update_coins),
    path('core/', views.get_core)
]
