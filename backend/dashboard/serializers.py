from rest_framework import serializers
from .models import Siswa, Guru, Kelas, Mapel

# UBAH CLASS INI
class KelasSerializer(serializers.ModelSerializer):
    # TAMBAHKAN FIELD INI
    display_name = serializers.SerializerMethodField()

    class Meta:
        model = Kelas
        fields = ['id', 'display_name']

    # TAMBAHKAN METHOD INI
    def get_display_name(self, obj):
        # obj adalah instance dari model Kelas
        return str(obj)

class SiswaSerializer(serializers.ModelSerializer):
    kelas = KelasSerializer(read_only=True)
    def get_foto_url(self, obj):
        request = self.context.get('request')
        if obj.foto and hasattr(request, 'build_absolute_uri'):
            return request.build_absolute_uri(obj.foto.url)
        return None

    class Meta:
        model = Siswa
        fields = ['id', 'nama', 'nama_lengkap', 'tanggal_lahir', 'nama_ayah', 'nama_ibu', 'alamat', 'no_hp', 'email', 'foto', 'kelas'] 