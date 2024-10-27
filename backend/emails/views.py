from django.shortcuts import render
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import EmailLog
from rest_framework.generics import ListAPIView
from .serializers import EmailLogSerializer  # type: ignore

# Create your views here.
class SendEmailView(APIView):
    def post(self, request):
        recipient = request.data.get('recipient')
        subject = request.data.get('subject')
        body = request.data.get('body')
        
        try:
            send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [recipient])
            EmailLog.objects.create(recipient=recipient, subject=subject, body=body, status="Sent")
            return Response({"message": "Email sent successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            EmailLog.objects.create(recipient=recipient, subject=subject, body=body, status="Failed")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class EmailLogListView(ListAPIView):
    queryset = EmailLog.objects.all().order_by('-sent_at')
    serializer_class = EmailLogSerializer