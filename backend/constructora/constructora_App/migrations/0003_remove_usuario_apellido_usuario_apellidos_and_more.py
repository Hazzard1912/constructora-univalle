# Generated by Django 5.0.4 on 2024-04-09 22:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('constructora_App', '0002_remove_usuario_cargo_usuario_apellido_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usuario',
            name='apellido',
        ),
        migrations.AddField(
            model_name='usuario',
            name='apellidos',
            field=models.CharField(default=None, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='usuario',
            name='nombre',
            field=models.CharField(max_length=100),
        ),
    ]
