# Generated by Django 5.1 on 2024-09-03 16:07

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("website", "0003_customuser_is_superuser_alter_customuser_is_active"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="customuser",
            name="is_superuser",
        ),
        migrations.AlterField(
            model_name="customuser",
            name="is_active",
            field=models.BooleanField(default=True),
        ),
    ]