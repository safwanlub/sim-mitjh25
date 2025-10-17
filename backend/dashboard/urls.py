from django.urls import path
from . import views  # <-- PASTIKAN INI ADA

urlpatterns = [
    # PASTIKAN BARIS INI ADA
    path('stats/', views.get_stats, name='get-stats'),
    path('siswa/', views.get_siswa_list, name='siswa-list'), # <-- TAMBAHKAN INI
    path('siswa/add/', views.add_siswa, name='add-siswa'), # <-- TAMBAHKAN INI
]