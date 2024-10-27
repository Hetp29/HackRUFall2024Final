from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    gender = models.CharField(max_length=10)
    location = models.CharField(max_length=255)
    total_spent = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    recency_score = models.IntegerField(default=0)
    frequency_score = models.IntegerField(default=0)
    monetary_score = models.IntegerField(default=0)
    rfm_score = models.IntegerField(default=0)
    churn_risk_score = models.FloatField(default=0.0)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    customer = models.ForeignKey(Customer, related_name='transactions', on_delete=models.CASCADE)
    product = models.ForeignKey('Product', related_name='transactions', on_delete=models.CASCADE)  # Use string reference for Product
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    transaction_type = models.CharField(max_length=50)  # e.g., purchase, refund
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.name} - {self.amount}"

class Category(models.Model):
    name = models.CharField(max_length=100)

class Product(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default="No description available")
    price = models.DecimalField(max_digits=10, decimal_places=2, default = 0.00)
    purchase_frequency = models.IntegerField(default=1)
    category = models.CharField(max_length=100, default="General")  # Adds a default value

    def __str__(self):
        return self.name
