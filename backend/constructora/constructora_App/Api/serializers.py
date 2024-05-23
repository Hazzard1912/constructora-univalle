from rest_framework import serializers
from ..models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
   
    ID_TYPE_CHOICES = [
        ('DNI', 'C.C Cédula de Ciudadania'),
        ('TI', 'T.I Tarjeta de Identidad'),
        ('CE', 'Cédula de Extranjería'),
        ('PAS', 'Pasaporte'),
    ]

    id_type = serializers.ChoiceField(choices=ID_TYPE_CHOICES)
    
    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
