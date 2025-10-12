from django.db import models

# INI ADALAH DEFINISI KELASNYA, BUKAN PERINTAH IMPORT
class Siswa(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class Guru(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class Kelas(models.Model):
    nama = models.CharField(max_length=50)

    def __str__(self):
        return self.nama