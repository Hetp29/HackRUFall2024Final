from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, email, name, job_title, phone, employees, company_name, password=None):
        """
        Create and return a regular user with an email and password.
        """
        if not email:
            raise ValueError(_('Users must have an email address'))
        email = self.normalize_email(email)
        user = self.model(
            email=email,
            name=name,
            job_title=job_title,
            phone=phone,
            employees=employees,
            company_name=company_name
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, job_title, phone, employees, company_name, password=None):
        """
        Create and return a superuser with an email and password.
        """
        user = self.create_user(
            email=email,
            name=name,
            job_title=job_title,
            phone=phone,
            employees=employees,
            company_name=company_name,
            password=password
        )
        user.is_admin = True
        user.is_staff = True
        user.save(using=self._db)
        return user

class CustomUser(AbstractBaseUser):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=100)
    job_title = models.CharField(max_length=100)
    phone = models.CharField(max_length=15, blank=True, null=True)
    employees = models.CharField(max_length=20)
    company_name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'job_title', 'employees', 'company_name', 'phone']

    def __str__(self):
        return self.email

    def has_perm(self, perm):
        """
        Check if the user has a specific permission.
        """
        return True  # Superusers have all permissions.

    def has_module_perms(self, app_label):
        """
        Check if the user has permissions to view the app `app_label`.
        """
        return True  # Superuser