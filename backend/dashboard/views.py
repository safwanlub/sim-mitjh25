from rest_framework.decorators import api_view # <-- TAMBAHKAN INI
from django.http import JsonResponse # Tambahin import model-model yang kita butuhkan
from rest_framework.response import Response # <-- IMPORT INI
from rest_framework import status # <-- IMPORT INI
from .models import Siswa, Guru, Kelas, Mapel
from .serializers import SiswaSerializer # <-- IMPORT INI


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

@api_view(['GET']) # <-- TAMBAHKAN STIKER INI
def get_siswa_list(request):
    # Ambil semua objek Siswa dari database
    siswa_list = Siswa.objects.all()
    # Gunakan "penerjemah" untuk mengubah data
    serializer = SiswaSerializer(siswa_list, many=True)
    # Kembalikan data dalam format JSON
    return Response(serializer.data)

# TAMBAHKAN FUNGSI TAMBAH
@api_view(['POST']) # <-- Stikernya buat POST
def add_siswa(request):
    # Ambil data 'nama' dari request body
    nama = request.data.get('nama')
    
    # Validasi sederhana: pastikan nama tidak kosong
    if not nama:
        return Response(
            {'error': 'Nama siswa tidak boleh kosong.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Buat objek Siswa baru di database
    siswa = Siswa.objects.create(nama=nama)
    
    # Siapkan serializer buat mengembalikan data yang baru dibuat
    serializer = SiswaSerializer(siswa, many=False)
    
    # Kembalikan response dengan data siswa baru dan status 201 (Created)
    return Response(serializer.data, status=status.HTTP_201_CREATED)
    

# TAMBAHKAN FUNGSI DELETE
@api_view(['DELETE']) # <-- Stikernya buat DELETE
def delete_siswa(request, pk):
    # Cari siswa berdasarkan Primary Key (id)
    try:
        siswa = Siswa.objects.get(pk=pk)
    except Siswa.DoesNotExist:
        return Response(
            {'error': 'Siswa tidak ditemukan.'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Hapus siswa dari database
    siswa.delete()
    
    # Kembalikan response kosong dengan status 204 (No Content)
    # Ini adalah standar untuk operasi hapus yang berhasil
    return Response(status=status.HTTP_204_NO_CONTENT)