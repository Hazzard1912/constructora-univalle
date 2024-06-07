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

        
# LOGICA DE LOGIN 
@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')

    try:
        user = User.objects.get(email=email)
        if user.is_superuser:
            # Si el usuario es un superusuario, intenta autenticarlo
            user = authenticate(request, username=user.username, password=password)
            if user is not None:
                # Si las credenciales son válidas, inicia sesión
                login(request, user)
                return JsonResponse({'status': 'ok', 'message': 'Superuser authenticated successfully'})
            else:
                # Si las credenciales son inválidas, devuelve un mensaje de error
                return JsonResponse({'status': 'error', 'message': 'Invalid email or password'}, status=400)
        else:
            # Si el usuario no es un superusuario, devuelve un mensaje de error
            return JsonResponse({'status': 'error', 'message': 'User is not a superuser'}, status=400)
    except User.DoesNotExist:
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