from django.db import models
from django.contrib.auth.models import User

# Create your models here.
# Django -Admin
# Name = constructora
# Password = DSconstructora

# Esta es una version de prueba para una tabla
class Usuario(models.Model):
    id = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=100)
    apellidos = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    
    def __str__(self):
        return self.user.username