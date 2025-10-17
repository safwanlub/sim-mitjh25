from rest_framework import serializers
from .models import Siswa

class SiswaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Siswa
        fields = ['id', 'nama'] # Field yang mau ditampilkan