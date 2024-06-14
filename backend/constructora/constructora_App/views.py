from django.http.response import HttpResponse as HttpResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import UserProfile, Work, Task, TaskProgress
from .Api.serializers import UserProfileSerializer, WorkSerializer, TaskSerializer, TaskProgressSerializer

        
# LOGICA MODIFICADA DE LOGIN 
@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')

    try:
        user = UserProfile.objects.get(username=username)
        if user.check_password(password):
            # Si las credenciales son válidas, devuelve la información del usuario
            return JsonResponse({
                'status': 'ok',
                'username': user.username,
                'role': user.role,
                'first_name': user.first_name,
                'last_name': user.last_name
            })
        else:
            # Si las credenciales son inválidas, devuelve un mensaje de error
            return JsonResponse({'status': 'error', 'message': 'Invalid username or password'}, status=400)
    except UserProfile.DoesNotExist:
        # Si el usuario no existe, devuelve un mensaje de error
        return JsonResponse({'status': 'error', 'message': 'User does not exist'}, status=400)
    
    
def welcome(request):
    return render(request, 'welcome.html')


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = UserProfile(
            photo=request.data.get('photo'),
            id_type=request.data.get('id_type'),
            id_number=request.data.get('id_number'),
            last_name=request.data.get('last_name'),
            first_name=request.data.get('first_name'),
            role=request.data.get('role'),
            username=request.data.get('username'),
            password=request.data.get('password'),  
            gender=request.data.get('gender'),
            address=request.data.get('address'),
            phone_number=request.data.get('phone_number'),
        )
        user.set_password(request.data.get('password'))  # Encripta la contraseña
        user.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    
class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)

class TaskProgressViewSet(viewsets.ModelViewSet):
    queryset = TaskProgress.objects.all()
    serializer_class = TaskProgressSerializer