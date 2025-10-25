from django.urls import path
from . import views

urlpatterns = [
    path('stats/', views.get_stats, name='get-stats'),
    # INI ADALAH URL UNTUK SISWA.
    path('siswa/', views.get_siswa_list, name='siswa-list'),
    path('siswa/add/', views.add_siswa, name='add-siswa'),
    path('siswa/<int:pk>/delete/', views.delete_siswa, name='delete-siswa'),
    path('siswa/<int:pk>/update/', views.update_siswa, name='update-siswa'), 
    # INI ADALAH URL UNTUK GURU.
    path('guru/', views.get_guru_list, name='guru-list'),
    path('guru/add/', views.add_guru, name='add-guru'),
    path('guru/<int:pk>/delete/', views.delete_guru, name='delete-guru'),
    path('guru/<int:pk>/update/', views.update_guru, name='update-guru'),

    path('kelas/', views.get_kelas_list, name='kelas-list'), 
    path('kelas/add/', views.add_kelas, name='add-kelas'), 
    path('kelas/<int:pk>/delete/', views.delete_kelas, name='delete-kelas'),
    path('kelas/<int:pk>/update/', views.update_kelas, name='update-kelas'),

    path('mapel/', views.get_mapel_list, name='mapel-list'),
    path('mapel/add/', views.add_mapel, name='add-mapel'), 

    path('buku/', views.get_buku_list, name='buku-list'),
    path('buku/add/', views.add_buku, name='add-buku'), 
    
]