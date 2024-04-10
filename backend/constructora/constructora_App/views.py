from django.http.response import HttpResponse as HttpResponse
from rest_framework import generics
from rest_framework.authtoken.models import Token
from django.urls import reverse_lazy
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from django.views.generic.edit import FormView
from django.contrib.auth import login, authenticate
from django.http import  HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from .models import Usuario
from .Api.serializers import UsuarioSerializer
from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.core.exceptions import ValidationError
from .models import Profile 


# Create your views here.
class UsuarioList(generics.ListCreateAPIView): #liostar y crear una instancia de mi modelo
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    
class Login(FormView):
    template_name = "login.html"
    form_class = AuthenticationForm
    success_url = reverse_lazy('constructora_App:Usuario_list')
    
    @method_decorator(csrf_protect)
    @method_decorator(never_cache)
    
    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            return HttpResponseRedirect(self.get_success_url())
        else:
            return super(Login, self).dispatch(request, *args, **kwargs)
        
    def form_valid(self, form):
        user = authenticate(username = form.cleaned_data['username'], password = form.cleaned_data['password'])
        token,_ = Token.objects.get_or_create(user=user)
        if token:
            login(self.request, form.get.user())
            return super(Login, self).form_valid(form)
        
# LOGICA DE LOGIN 
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({'status': 'ok'})
        else:
            return JsonResponse({'status': 'error', 'message': 'Invalid login'})
    else:
        return JsonResponse({'status': 'error', 'message': 'Invalid method'})




@api_view(['POST'])
def register(request):
    try:
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        gender = request.data.get('gender')

        if not username or not password or not email or not first_name or not last_name or not gender:
            return Response({'error': 'Todos los campos son obligatorios'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, password=password, email=email, first_name=first_name, last_name=last_name)
        profile = Profile(user=user, gender=gender)  # Crea un perfil para el usuario
        profile.save()  # Guarda el perfil
        user.save()

        return Response({'message': 'Usuario creado correctamente'}, status=status.HTTP_201_CREATED)
    except ValidationError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:  # Captura cualquier otra excepción
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)