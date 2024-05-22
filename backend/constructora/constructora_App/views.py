from django.http.response import HttpResponse as HttpResponse
from django.contrib.auth import login, authenticate
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from django.shortcuts import render
from django.http import JsonResponse


        
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