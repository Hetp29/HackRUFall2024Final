from rest_framework import serializers
from .models import CustomUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['name', 'job_title', 'email', 'phone', 'employees', 'company_name', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            name=validated_data['name'],
            job_title=validated_data['job_title'],
            phone=validated_data.get('phone', ''),
            employees=validated_data['employees'],
            company_name=validated_data['company_name'],
            password=validated_data['password']
        )
        return user