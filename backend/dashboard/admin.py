from django.contrib import admin
from .models import Siswa, Guru, Kelas

# Ini adalah perintah untuk mendaftarkan model ke halaman admin
admin.site.register(Siswa)
admin.site.register(Guru)
admin.site.register(Kelas)