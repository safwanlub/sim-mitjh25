"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function SiswaPage() {
  // State untuk daftar siswa
  const [siswaList, setSiswaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState(null);

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

  // TAMBAHKAN FUNGSI BARU UNTUK MENGHAPUS DATA
  const handleDelete = async (siswaId) => {
    // Tampilkan dialog konfirmasi
    const isConfirmed = window.confirm(
      "Apakah yakin ingin menghapus data siswa ini?"
    );
    if (!isConfirmed) {
      return; // User batal, nggak jadi hapus
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/dashboard/siswa/${siswaId}/delete/`,
        {
          method: "DELETE", // Penting: method-nya DELETE
        }
      );

      if (response.ok) {
        // Berhasil hapus! Hapus item dari state tanpa refresh
        setSiswaList(siswaList.filter((siswa) => siswa.id !== siswaId));
      } else {
        // Handle error
        alert("Gagal menghapus siswa.");
      }
    } catch (error) {
      alert("Gagal menghapus siswa. Cek koneksi.");
    }
  };

  // TAMBAHKAN FUNGSI BARU UNTUK MENGHANDLE EDIT
  const handleEdit = (siswa) => {
    setEditingSiswa(siswa); // Set siswa yang akan diedit
    setIsEditModalOpen(true); // Buka modal
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/dashboard/siswa/${editingSiswa.id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama: editingSiswa.nama }),
        }
      );

      if (response.ok) {
        // Berhasil! Update data di state
        const updatedSiswa = await response.json();
        setSiswaList(
          siswaList.map((s) => (s.id === updatedSiswa.id ? updatedSiswa : s))
        );
        // Tutup modal dan reset state
        setIsEditModalOpen(false);
        setEditingSiswa(null);
      } else {
        alert("Gagal mengupdate siswa.");
      }
    } catch (error) {
      alert("Gagal mengupdate siswa. Cek koneksi.");
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(siswa)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(siswa.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* TAMBAHKAN KOMPONEN MODAL EDIT */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <div className="mt-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Edit Siswa
                </h3>
                <form onSubmit={handleUpdateSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nama Siswa
                    </label>
                    <input
                      type="text"
                      value={editingSiswa.nama}
                      onChange={(e) =>
                        setEditingSiswa({
                          ...editingSiswa,
                          nama: e.target.value,
                        })
                      }
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      required
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      type="button"
                      onClick={() => setIsEditModalOpen(false)}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
                    >
                      {isSubmitting ? "Menyimpan..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
