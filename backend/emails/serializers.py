# emails/serializers.py
from rest_framework import serializers
from .models import EmailLog

class EmailLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = EmailLog
        fields = ['recipient', 'subject', 'body', 'sent_at', 'status']
