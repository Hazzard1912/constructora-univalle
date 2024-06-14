from django.db import models
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password


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
    
    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)
    
    
class Work(models.Model):
    STATUS_CHOICES = [
        ('asignada', 'Asignada'),
        ('en desarrollo', 'En Desarrollo'),
        ('en revisión', 'En Revisión'),
        ('aceptada', 'Aceptada'),
    ]

    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    location = models.CharField(max_length=255)
    work_type = models.CharField(max_length=255)
    start_date = models.DateField()

    director = models.ForeignKey(UserProfile, related_name='work_director', on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'Director de obra'})
    foreman = models.ForeignKey(UserProfile, related_name='work_foreman', on_delete=models.SET_NULL, null=True, limit_choices_to={'role': 'Capataz de obra'})
    laborers = models.ManyToManyField(UserProfile, related_name='work_laborers', limit_choices_to={'role': 'Peón'})
    assistants = models.ManyToManyField(UserProfile, related_name='work_assistants', limit_choices_to={'role': 'Ayudante de albañil'})

    def __str__(self):
        return self.name


class Task(models.Model):
    STATUS_CHOICES = [
        ('asignada', 'Asignada'),
        ('en desarrollo', 'En desarrollo'),
        ('en revisión', 'En revisión'),
        ('aceptada', 'Aceptada'),
    ]
    
    TASK_TYPE_CHOICES = [
        ('obra negra', 'Obra Negra'),
        ('obra gris', 'Obra Gris'),
        ('obra blanca', 'Obra Blanca'),
    ]

    work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name='tasks')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='asignada')
    foreman = models.ForeignKey(UserProfile, on_delete=models.CASCADE, limit_choices_to={'role': 'Capataz de obra'}, related_name='tasks_as_foreman')
    description = models.TextField()
    estimated_completion_date = models.DateField()
    assistants = models.ManyToManyField(UserProfile, related_name='tasks_as_assistant', limit_choices_to={'role': 'Ayudante de albañil'})
    laborers = models.ManyToManyField(UserProfile, related_name='tasks_as_laborer', limit_choices_to={'role': 'Peón'})
    task_type = models.CharField(max_length=20, choices=TASK_TYPE_CHOICES)
    assignment_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"Tarea de {self.work.name}"
    
class TaskProgress(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='progresses')
    description = models.TextField()
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    audio_note = models.FileField(upload_to='audio_notes/', null=True, blank=True)
    photo = models.ImageField(upload_to='photos/', null=True, blank=True)
    document = models.FileField(upload_to='documents/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Avance de la tarea {self.task.id} - {self.task.work.name}"
    
