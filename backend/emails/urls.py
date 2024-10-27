from django.urls import path
from .views import SendEmailView, EmailLogListView

urlpatterns = [
    path('send/', SendEmailView.as_view(), name='send_email'),
    path('logs/', EmailLogListView.as_view(), name='email_logs')
]
