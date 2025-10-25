from rest_framework.decorators import api_view # <-- TAMBAHKAN INI
from django.http import JsonResponse # Tambahin import model-model yang kita butuhkan
from rest_framework.response import Response # <-- IMPORT INI
from rest_framework import status # <-- IMPORT INI
from .models import Siswa, Guru, Kelas, Mapel
from .serializers import SiswaSerializer # <-- IMPORT INI
from .serializers import SiswaSerializer, KelasSerializer


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

@api_view(['GET']) # <-- FUNGSI SISWA
def get_siswa_list(request):
    siswa_list = Siswa.objects.all().select_related('kelas')
    serializer = SiswaSerializer(siswa_list, many=True)
    return Response(serializer.data)

# TAMBAHKAN FUNGSI TAMBAH
@api_view(['POST']) # <-- Stikernya buat POST
def add_siswa(request):
    # Ambil data 'nama' dari request body
    nama = request.data.get('nama')
    kelas_id = request.data.get('kelas')
    
    # Validasi sederhana: pastikan nama tidak kosong
    if not nama or not kelas_id:
        return Response({'error': 'Nama dan kelas tidak boleh kosong.'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Cari objek Kelas berdasarkan ID
    try:
        kelas_obj = Kelas.objects.get(id=kelas_id)
    except Kelas.DoesNotExist:
        return Response({'error': 'Kelas tidak ditemukan.'}, status=status.HTTP_400_BAD_REQUEST)

    # Buat objek Siswa dan hubungkan ke kelas
    siswa = Siswa.objects.create(nama=nama, kelas=kelas_obj)
    
    # Buat data untuk dikembalikan
    data = {
        'id': siswa.id, 
        'nama': siswa.nama,
        'kelas': {
            'id': siswa.kelas.id,
            'display_name': str(siswa.kelas)
        }
    }
    return Response(data, status=status.HTTP_201_CREATED)
    

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

# ... (fungsi delete_siswa)

# TAMBAHKAN FUNGSI edit INI
@api_view(['PUT']) # <-- Stikernya buat PUT
def update_siswa(request, pk):
    # Cari siswa berdasarkan Primary Key (id)
    try:
        siswa = Siswa.objects.get(pk=pk)
    except Siswa.DoesNotExist:
        return Response(
            {'error': 'Siswa tidak ditemukan.'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Ambil data 'nama' dari request body
    serializer = SiswaSerializer(instance=siswa, data=request.data, partial=True)
    
    # Validasi dan simpan perubahan
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET']) # <-- FUNGSI GURU
def get_guru_list(request):
    guru_list = Guru.objects.all()
    data = [{'id': guru.id, 'nama': guru.nama} for guru in guru_list]
    return Response(data)

# TAMBAHKAN FUNGSI TAMBAH
@api_view(['POST']) # <-- Stikernya buat POST
def add_guru(request):
    # Ambil data 'nama' dari request body
    nama = request.data.get('nama')
    
    # Validasi sederhana: pastikan nama tidak kosong
    if not nama:
        return Response(
            {'error': 'Nama guru tidak boleh kosong.'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Buat objek Guru baru di database
    guru = Guru.objects.create(nama=nama)
    
    # Siapkan serializer buat mengembalikan data yang baru dibuat
    # serializer = GuruSerializer(guru, many=False)
    
    # Kembalikan response dengan data siswa baru dan status 201 (Created)
    return Response(status=status.HTTP_201_CREATED)
    

# TAMBAHKAN FUNGSI DELETE
@api_view(['DELETE']) # <-- Stikernya buat DELETE
def delete_guru(request, pk):
    # Cari guru berdasarkan Primary Key (id)
    try:
        guru = Guru.objects.get(pk=pk)
    except Guru.DoesNotExist:
        return Response(
            {'error': 'Guru tidak ditemukan.'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Hapus guru dari database
    guru.delete()
    
    # Kembalikan response kosong dengan status 204 (No Content)
    # Ini adalah standar untuk operasi hapus yang berhasil
    return Response(status=status.HTTP_204_NO_CONTENT)

# ... (fungsi delete_guru)

# TAMBAHKAN FUNGSI edit INI
@api_view(['PUT']) # <-- Stikernya buat PUT
def update_guru(request, pk):
    # Cari guru berdasarkan Primary Key (id)
    try:
        guru = Guru.objects.get(pk=pk)
    except Guru.DoesNotExist:
        return Response(
            {'error': 'Guru tidak ditemukan.'}, 
            status=status.HTTP_404_NOT_FOUND
        )
    
    # Ambil data 'nama' dari request body
    # serializer = GuruSerializer(instance=guru, data=request.data, partial=True)
    
    # Ambil data 'nama' dari request body
    serializer = SiswaSerializer(instance=guru, data=request.data, partial=True)
    
    if serializer.is_valid():
        serializer.save()
        # Karena kita nggak punya serializer untuk Guru, kita bikin manual
        guru.nama = request.data.get('nama', guru.nama)
        guru.save()
        data = {'id': guru.id, 'nama': guru.nama}
        return Response(data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# TAMBAHKAN FUNGSI INI
@api_view(['GET'])
def get_kelas_list(request):
    kelas_list = Kelas.objects.all().order_by('tingkat', 'nama_kelas')
    
    # Ubah data ke format JSON
    data = []
    for kelas in kelas_list:
        data.append({
            'id': kelas.id, 
            'nama_kelas': kelas.nama_kelas, 
            'tingkat': kelas.tingkat,
            'display_name': str(kelas) # Ini akan menghasilkan "Kelas 1 A"
        })
        
    return Response(data)

@api_view(['POST'])
def add_kelas(request):
    nama_kelas = request.data.get('nama_kelas')
    tingkat = request.data.get('tingkat')
    
    if not nama_kelas or not tingkat:
        return Response({'error': 'Nama kelas dan tingkat tidak boleh kosong.'}, status=status.HTTP_400_BAD_REQUEST)
    
    kelas = Kelas.objects.create(nama_kelas=nama_kelas, tingkat=tingkat)
    
    data = {'id': kelas.id, 'nama_kelas': kelas.nama_kelas, 'tingkat': kelas.tingkat, 'display_name': str(kelas)}
    return Response(data, status=status.HTTP_201_CREATED)

# TAMBAHKAN FUNGSI INI
@api_view(['DELETE'])
def delete_kelas(request, pk):
    try:
        kelas = Kelas.objects.get(pk=pk)
    except Kelas.DoesNotExist:
        return Response({'error': 'Kelas tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)
    
    kelas.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

# DAN FUNGSI INI
@api_view(['PUT'])
def update_kelas(request, pk):
    try:
        kelas = Kelas.objects.get(pk=pk)
    except Kelas.DoesNotExist:
        return Response({'error': 'Kelas tidak ditemukan.'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = KelasSerializer(instance=kelas, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        data = {'id': kelas.id, 'nama_kelas': kelas.nama_kelas, 'tingkat': kelas.tingkat, 'display_name': str(kelas)}
        return Response(data)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def add_mapel(request):
    nama = request.data.get('nama')
        
    if not nama:
        return Response({'error': 'Nama mapel tidak boleh kosong.'}, status=status.HTTP_400_BAD_REQUEST)
    
    mapel = Mapel.objects.create(nama=nama, )
    
    data = {'id': mapel.id, 'nama': mapel.nama}
    return Response(data, status=status.HTTP_201_CREATED)

@api_view(['GET'])
def get_mapel_list(request):
    mapel_list = Mapel.objects.all().order_by('nama') # Urutkan berdasarkan nama
    
    # Ubah data ke format JSON
    data = []
    for mapel in mapel_list:
        data.append({
            'id': mapel.id, 
            'nama': mapel.nama, 
            'display_name': f"{mapel.nama}" # Tambahkan ini
        })
        
    return Response(data)

@api_view(['GET'])
def get_buku_list(request):
    buku_list = Mapel.objects.all().order_by('nama') # Urutkan berdasarkan nama
    
    # Ubah data ke format JSON
    data = []
    for buku in buku_list:
        data.append({
            'id': buku.id, 
            'nama': buku.nama, 
            'display_name': f"{buku.nama}" # Tambahkan ini
        })
        
    return Response(data)

@api_view(['POST'])
def add_buku(request):
    nama = request.data.get('nama')
        
    if not nama:
        return Response({'error': 'Nama buku tidak boleh kosong.'}, status=status.HTTP_400_BAD_REQUEST)
    
    buku = Buku.objects.create(nama=nama, )
    
    data = {'id': buku.id, 'nama': buku.nama}
    return Response(data, status=status.HTTP_201_CREATED)
