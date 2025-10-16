from django.http import JsonResponse
# Tambahin import model-model yang kita butuhkan
from .models import Siswa, Guru, Kelas, Mapel

def get_stats(request):
    # Ini adalah "sihir" Django ORM!
    # .count() akan menghitung jumlah semua objek di tabel tersebut
    total_siswa = Siswa.objects.count()
    total_guru = Guru.objects.count()
    total_kelas = Kelas.objects.count()
    total_mapel = Mapel.objects.count()

    data = {
        'total_siswa': total_siswa,
        'total_guru': total_guru,
        'total_kelas': total_kelas,
        'total_mapel': total_mapel,
    }
    return JsonResponse(data)
