from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/dashboard/', include('dashboard.urls')), # <-- PASTIKAN BARIS INI ADA
    # ... baris lainnya
]