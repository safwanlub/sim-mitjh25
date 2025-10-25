from django.db import models
class Guru(models.Model):
    nama = models.CharField(max_length=100)

    def __str__(self):
        return self.nama


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
    
    nama_kelas = models.CharField(max_length=10)
    tingkat = models.CharField(max_length=1, choices=TINGKAT_CHOICES)
    wali_kelas = models.ForeignKey(Guru, on_delete=models.SET_NULL, null=True, related_name='wali') # <-- TAMBAHKAN INI
    
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
    
class Penerbit(models.Model):
    nama = models.CharField(max_length=100)
    alamat = models.CharField(max_length=200, blank=True)
    
    def __str__(self):
        return self.nama
    
class Buku(models.Model):
    judul = models.CharField(max_length=200)
    penerbit = models.ForeignKey(Penerbit, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.judul

class Mapel(models.Model):
    nama = models.CharField(max_length=100)
    buku = models.ForeignKey(Buku, on_delete=models.SET_NULL, null=True)
    
    def __str__(self):
        return self.nama

# Tambahkan class ini di bagian bawah
class KelasGuru(models.Model):
    kelas = models.ForeignKey(Kelas, on_delete=models.CASCADE)
    guru = models.ForeignKey(Guru, on_delete=models.CASCADE)
    is_wali_kelas = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ('kelas', 'guru') # Memastikan satu guru hanya ada sekali di satu kelas

class MapelGuru(models.Model):
    mapel = models.ForeignKey(Mapel, on_delete=models.CASCADE)
    guru = models.ForeignKey(Guru, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('mapel', 'guru') # Satu guru hanya bisa mengajar satu mapel

class KelasMapel(models.Model):
    kelas = models.ForeignKey(Kelas, on_delete=models.CASCADE)
    mapel = models.ForeignKey(Mapel, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('kelas', 'mapel') # Satu mapel hanya ada sekali di satu kelas





    