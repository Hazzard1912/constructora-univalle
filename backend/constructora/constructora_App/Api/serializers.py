from rest_framework import serializers
from ..models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
   
    ID_TYPE_CHOICES = [
        ('C.C', 'C.C Cédula de Ciudadania'),
        ('T.I', 'T.I Tarjeta de Identidad'),
        ('C.E', 'Cédula de Extranjería'),
        ('PASAPORTE', 'Pasaporte'),
    ]

    id_type = serializers.ChoiceField(choices=ID_TYPE_CHOICES)
    
    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}
