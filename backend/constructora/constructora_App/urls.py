from django.urls import path, include
from .views import login_view, welcome, UserProfileViewSet, WorkViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
router.register(r'works', WorkViewSet)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('welcome/', welcome, name='welcome'),
    path('', include(router.urls)),

]
