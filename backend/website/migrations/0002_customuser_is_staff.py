# Generated by Django 5.1 on 2024-08-21 03:27

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("website", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="customuser",
            name="is_staff",
            field=models.BooleanField(default=False),
        ),
    ]