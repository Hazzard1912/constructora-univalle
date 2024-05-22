from django.urls import path
from . import views
from .views import login_view, welcome


urlpatterns = [
    path('login/', login_view, name='login'),
    path('welcome/', welcome, name='welcome'),
]
