# akademik/models.py
from django.db import models
from django.contrib.auth.models import User

class Siswa(models.Model):

    JENIS_KELAMIN = (
        ('L', 'Laki-laki'),
        ('P', 'Perempuan'),
    )
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='siswa')
    nis = models.CharField(max_length=20, unique=True)
    nama_lengkap = models.CharField(max_length=100)
    jenis_kelamin = models.CharField(max_length=1, choices=JENIS_KELAMIN)
    tanggal_lahir = models.DateField()
    alamat = models.TextField(blank=True)

    def __str__(self):
        return self.nama_lengkap

class Guru(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='guru')
    nip = models.CharField(max_length=20, unique=True)
    nama_lengkap = models.CharField(max_length=100)
    mata_pelajaran = models.CharField(max_length=50)
    nomor_telepon = models.CharField(max_length=15, blank=True)

    def __str__(self):
        return self.nama_lengkap