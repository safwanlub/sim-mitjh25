from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Tambahkan field-field kustom kamu di sini
    # Contoh:
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('guru', 'Guru'),
        ('staff', 'Staff'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='staff')
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username