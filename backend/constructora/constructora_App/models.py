from django.db import models

# Create your models here.
# Django -Admin
# Name = constructora
# Password = DSconstructora
# Esta es una version de prueba para una tabla

class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    cargo = models.CharField(max_length=100)
    
    def __str__(self):
        return self.nombre
    