from django.db import models
from django.contrib.auth.models import User


# Create your models here.
# Django -Admin
# Name = constructora
# Password = DSconstructora
 
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=10)
    
    def __str__(self):
        return self.user.username
    


class UserProfile(models.Model):
    GENDER_CHOICES = [
        ('M', 'Masculino'),
        ('F', 'Femenino'),
        ('O', 'Otro'),
    ]

    ROLE_CHOICES = [
        ('Gerente', 'Gerente'),
        ('Director de obra', 'Director de obra'),
        ('Capataz de obra', 'Capataz de obra'),
        ('Peón', 'Peón'),
        ('Ayudante de albañil', 'Ayudante de albañil'),
    ]

    photo = models.ImageField(upload_to='user_photos/', blank=True, null=True)
    id_type = models.CharField(max_length=50)
    id_number = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    first_name = models.CharField(max_length=50)
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)
    username = models.CharField(max_length=50, unique=True)
    password = models.CharField(max_length=128)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.role}"
    
