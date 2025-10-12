from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # INI ADALAH BARIS YANG PENTING
    path('api/dashboard/', include('dashboard.urls')),
]
