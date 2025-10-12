# akademik/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # Ubah views.SiswaListAPIView menjadi views.SiswaListCreateAPIView
    path('siswa/', views.SiswaListCreateAPIView.as_view(), name='siswa-list'),
]