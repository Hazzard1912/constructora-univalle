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