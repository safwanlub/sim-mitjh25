from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # Ini adalah baris yang penting buat dashboard
    path('api/dashboard/', include('dashboard.urls')),
    # Mungkin lo juga punya ini, biarkan aja
    path('api/siswa/', include('siswa.urls')), # <-- PERHATIKAN, TANPA SPASI
]