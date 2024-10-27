from django.db import models

# Create your models here.
class EmailLog(models.Model):
    recipient = models.EmailField()
    subject = models.CharField(max_length=255)
    body = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=[('Sent', 'Sent'), ('Failed', 'Failed')])
    
    def __str__(self):
        return f"Email to {self.recipient} - {self.status}"

class EmailTemplate(models.Model):
    name = models.CharField(max_length=100)
    subject = models.CharField(max_length=255)
    body = models.TextField()
    
    def __str__(self):
        return self.name
    