# analytics/admin.py
from django.contrib import admin
from .models import Customer, Transaction, Product  # Import your models

# Register models to make them visible in the admin
admin.site.register(Customer)
admin.site.register(Transaction)
admin.site.register(Product)
