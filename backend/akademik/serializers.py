# backend/akademik/serializers.py (Versi yang Diperbaiki)
from rest_framework import serializers
from .models import Siswa

class SiswaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Siswa
        # Tambahkan 'tanggal_lahir' ke dalam list
        fields = ['nis', 'nama_lengkap', 'jenis_kelamin', 'tanggal_lahir']