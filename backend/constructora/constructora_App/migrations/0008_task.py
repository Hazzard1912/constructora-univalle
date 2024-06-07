# Generated by Django 5.0.6 on 2024-06-05 20:57

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructora_App', '0007_work'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('asignada', 'Asignada'), ('en desarrollo', 'En desarrollo'), ('en revisión', 'En revisión'), ('aceptada', 'Aceptada')], default='asignada', max_length=20)),
                ('description', models.TextField()),
                ('estimated_completion_date', models.DateField()),
                ('task_type', models.CharField(choices=[('obra negra', 'Obra Negra'), ('obra gris', 'Obra Gris'), ('obra blanca', 'Obra Blanca')], max_length=20)),
                ('assignment_date', models.DateField(auto_now_add=True)),
                ('assistants', models.ManyToManyField(limit_choices_to={'role': 'Ayudante de albañil'}, related_name='tasks_as_assistant', to='constructora_App.userprofile')),
                ('foreman', models.ForeignKey(limit_choices_to={'role': 'Capataz de obra'}, on_delete=django.db.models.deletion.CASCADE, related_name='tasks_as_foreman', to='constructora_App.userprofile')),
                ('laborers', models.ManyToManyField(limit_choices_to={'role': 'Peón'}, related_name='tasks_as_laborer', to='constructora_App.userprofile')),
                ('work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='tasks', to='constructora_App.work')),
            ],
        ),
    ]
