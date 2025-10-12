from django.http import JsonResponse

def get_stats(request):
    data = {
        'total_siswa': 1234,
        'total_guru': 56,
        'total_kelas': 12, # Aku isi dulu ya
    }
    return JsonResponse(data)