# akademik/views.py
from rest_framework import generics
from .models import Siswa
from .serializers import SiswaSerializer

# Ganti nama kelas dan parent class-nya
class SiswaListCreateAPIView(generics.ListCreateAPIView):
    queryset = Siswa.objects.all()
    serializer_class = SiswaSerializer