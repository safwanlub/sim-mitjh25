from django.db import models

class Kelas(models.Model):
    # Pilihan untuk tingkatan kelas (SESUAIKAN UNTUK SD)
    TINGKAT_CHOICES = [
        ('1', 'Kelas 1'),
        ('2', 'Kelas 2'),
        ('3', 'Kelas 3'),
        ('4', 'Kelas 4'),
        ('5', 'Kelas 5'),
        ('6', 'Kelas 6'),
    ]
    
    nama_kelas = models.CharField(max_length=10) # contoh: "A", "B", "C"
    tingkat = models.CharField(max_length=1, choices=TINGKAT_CHOICES)

    def __str__(self):
        return f"{self.get_tingkat_display()} {self.nama_kelas}"
    
    
# INI ADALAH DEFINISI KELASNYA, BUKAN PERINTAH IMPORT
class Siswa(models.Model):
    nama = models.CharField(max_length=100)
    kelas = models.ForeignKey(Kelas, on_delete=models.SET_NULL, null=True, blank=True)
    nama_lengkap = models.CharField(max_length=200, blank=True)
    tanggal_lahir = models.DateField(null=True, blank=True)
    nama_ayah = models.CharField(max_length=100, blank=True)
    nama_ibu = models.CharField(max_length=100, blank=True)
    alamat = models.TextField(blank=True)
    no_hp = models.CharField(max_length=20, blank=True)
    email = models.EmailField(blank=True)
    foto = models.ImageField(upload_to='siswa_foto/', null=True, blank=True)
    

    def __str__(self):
        return self.nama

class Guru(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama

class Mapel(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama
    


    