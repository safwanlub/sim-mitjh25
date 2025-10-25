from django.urls import path
from . import views

app_name = 'dashboard'

urlpatterns = [
    # Contoh: URL untuk halaman utama dashboard
    path('', views.dashboard_home, name='home'),
]