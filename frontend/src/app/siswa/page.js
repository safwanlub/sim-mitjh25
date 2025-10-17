"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function SiswaPage() {
  // State untuk daftar siswa
  const [siswaList, setSiswaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // State untuk form tambah siswa
  const [formData, setFormData] = useState({ nama: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Effect untuk mengambil data siswa saat halaman dimuat
  useEffect(() => {
    const fetchSiswa = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard/siswa/"
        );
        const data = await response.json();
        setSiswaList(data);
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiswa();
  }, []);

  // Fungsi untuk menghandle submit form
  const handleSubmit = async (event) => {
    event.preventDefault(); // Cegah reload halaman
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard/siswa/add/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // Berhasil! Kosongkan form dan refresh data
        setFormData({ nama: "" });
        // Cara refresh yang lebih baik: panggil lagi fungsi fetch
        const fetchSiswa = async () => {
          try {
            const response = await fetch(
              "http://127.0.0.1:8000/api/dashboard/siswa/"
            );
            const data = await response.json();
            setSiswaList(data);
          } catch (error) {
            console.error("Gagal mengambil data siswa:", error);
          }
        };
        fetchSiswa();
      } else {
        const errorData = await response.json();
        alert(`Gagal menambah siswa: ${errorData.error}`);
      }
    } catch (error) {
      alert("Gagal menambah siswa. Cek koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading data siswa...</div>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Data Siswa</h1>

        {/* FORM UNTUK MENAMBAH SISWA */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-50 p-4 rounded-lg shadow"
        >
          <div className="flex items-center space-x-4">
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={(e) =>
                setFormData({ ...formData, nama: e.target.value })
              }
              placeholder="Masukkan nama siswa"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>

        {/* TABEL DAFTAR SISWA */}
        <div className="bg-white shadow rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Siswa
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {siswaList.map((siswa) => (
                <tr key={siswa.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {siswa.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {siswa.nama}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}
