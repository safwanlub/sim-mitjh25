from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def dashboard_home(request):
    # Logika untuk menampilkan data di dashboard bisa ditambahkan di sini
    context = {
        'page_title': 'Dashboard MIT Jam\'iyyatil Huda',
    }
    return render(request, 'dashboard/home.html', context)