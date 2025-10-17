from django.urls import path
from . import views

urlpatterns = [
    path('stats/', views.get_stats, name='get-stats'),
    path('siswa/', views.get_siswa_list, name='siswa-list'),
    path('siswa/add/', views.add_siswa, name='add-siswa'),
    # INI ADALAH BARIS YANG PALING KRUSIAL. PERHATIKAN BAGIAN INI.
    path('siswa/<int:pk>/delete/', views.delete_siswa, name='delete-siswa'),
    path('siswa/<int:pk>/update/', views.update_siswa, name='update-siswa'), 
]