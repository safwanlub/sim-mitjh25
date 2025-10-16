from django.contrib import admin
from .models import Siswa, Guru, Kelas, Mapel

# Ini adalah perintah untuk mendaftarkan model ke halaman admin
admin.site.register(Siswa)
admin.site.register(Guru)
admin.site.register(Kelas)
admin.site.register(Mapel) 