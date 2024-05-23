from django.urls import path, include
from .views import login_view, welcome, UserProfileViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'users', UserProfileViewSet)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('welcome/', welcome, name='welcome'),
    path('', include(router.urls)),

]
