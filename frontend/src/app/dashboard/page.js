"use client"; // Ini wajib karena kita pake hook (useState, useEffect)

import { useState, useEffect } from "react";

export default function DashboardPage() {
  // Siapkan "wadah" buat nyimpen data statistik
  const [stats, setStats] = useState({
    total_siswa: 0,
    total_guru: 0,
    total_kelas: 0,
  });

  // Siapkan status buat ngecek apakah data lagi di-load
  const [isLoading, setIsLoading] = useState(true);

  // useEffect ini akan jalan sekali pas komponen pertama kali muncul
  useEffect(() => {
    // Buat fungsi async buat ngambil data
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard/stats/"
        );
        const data = await response.json();

        // Masukkan data yang didapat ke "wadah" (state)
        setStats(data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        // Matikan status loading setelah proses selesai (berhasil atau gagal)
        setIsLoading(false);
      }
    };

    fetchStats(); // Panggil fungsi-nya
  }, []); // Array kosong berarti efek ini cuma jalan sekali

  // Tampilkan loading kalau data belum siap
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Ganti angka-angka ini dengan data dari state 'stats' */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Siswa</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.total_siswa}
          </p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Guru</h3>
          <p className="text-3xl font-bold text-gray-900">{stats.total_guru}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Kelas</h3>
          <p className="text-3xl font-bold text-gray-900">
            {stats.total_kelas}
          </p>
        </div>
      </div>
    </div>
  );
}
