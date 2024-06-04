from rest_framework import serializers
from ..models import UserProfile, Work

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



class WorkSerializer(serializers.ModelSerializer):
    director = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.filter(role='Director de obra'))
    foreman = serializers.PrimaryKeyRelatedField(queryset=UserProfile.objects.filter(role='Capataz de obra'))
    laborers = serializers.PrimaryKeyRelatedField(many=True, queryset=UserProfile.objects.filter(role='Peón'))
    assistants = serializers.PrimaryKeyRelatedField(many=True, queryset=UserProfile.objects.filter(role='Ayudante de albañil'))

    director_name = serializers.SerializerMethodField()
    foreman_name = serializers.SerializerMethodField()
    laborers_names = serializers.SerializerMethodField()
    assistants_names = serializers.SerializerMethodField()

    class Meta:
        model = Work
        fields = '__all__'
        extra_fields = ['director_name', 'foreman_name', 'laborers_names', 'assistants_names']

    def get_director_name(self, obj):
        return f"{obj.director.first_name} {obj.director.last_name}" if obj.director else None

    def get_foreman_name(self, obj):
        return f"{obj.foreman.first_name} {obj.foreman.last_name}" if obj.foreman else None

    def get_laborers_names(self, obj):
        return [f"{laborer.first_name} {laborer.last_name}" for laborer in obj.laborers.all()]

    def get_assistants_names(self, obj):
        return [f"{assistant.first_name} {assistant.last_name}" for assistant in obj.assistants.all()]
    
    