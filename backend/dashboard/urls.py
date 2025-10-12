from django.urls import path
from . import views  # <-- PASTIKAN INI ADA

urlpatterns = [
    # PASTIKAN BARIS INI ADA
    path('stats/', views.get_stats, name='get-stats'),
]