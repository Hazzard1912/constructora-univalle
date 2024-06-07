from django.urls import path, include
from .views import login_view, welcome, UserProfileViewSet, WorkViewSet, TaskViewSet, TaskProgressViewSet
from rest_framework.routers import DefaultRouter


router = DefaultRouter()
router.register(r'users', UserProfileViewSet)
router.register(r'works', WorkViewSet)
router.register(r'tasks', TaskViewSet)
router.register(r'task-progress', TaskProgressViewSet)

urlpatterns = [
    path('login/', login_view, name='login'),
    path('welcome/', welcome, name='welcome'),
    path('', include(router.urls)),

]
