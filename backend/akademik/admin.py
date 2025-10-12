# akademik/admin.py
from django.contrib import admin
from .models import Siswa, Guru

admin.site.register(Siswa)
admin.site.register(Guru)
