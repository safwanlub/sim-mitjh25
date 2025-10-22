"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function kelasPage() {
  // State untuk daftar kelas
  const [kelasList, setkelasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingkelas, setEditingkelas] = useState(null);

  // Effect untuk mengambil data kelas saat halaman dimuat
  useEffect(() => {
    const fetchkelas = async () => {
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/dashboard/kelas/"
        );
        const data = await response.json();
        setkelasList(data);
      } catch (error) {
        console.error("Gagal mengambil data kelas:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchkelas();
  }, []);

  // Fungsi untuk menghandle submit form
  const handleSubmit = async (event) => {
    event.preventDefault(); // Cegah reload halaman
    setIsSubmitting(true);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/dashboard/kelas/add/",
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
        const fetchkelas = async () => {
          try {
            const response = await fetch(
              "http://127.0.0.1:8000/api/dashboard/kelas/"
            );
            const data = await response.json();
            setkelasList(data);
          } catch (error) {
            console.error("Gagal mengambil data kelas:", error);
          }
        };
        fetchkelas();
      } else {
        const errorData = await response.json();
        alert(`Gagal menambah kelas: ${errorData.error}`);
      }
    } catch (error) {
      alert("Gagal menambah kelas. Cek koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // TAMBAHKAN FUNGSI BARU UNTUK MENGHAPUS DATA
  const handleDelete = async (kelasId) => {
    // Tampilkan dialog konfirmasi
    const isConfirmed = window.confirm(
      "Apakah yakin ingin menghapus data kelas ini?"
    );
    if (!isConfirmed) {
      return; // User batal, nggak jadi hapus
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/dashboard/kelas/${kelasId}/delete/`,
        {
          method: "DELETE", // Penting: method-nya DELETE
        }
      );

      if (response.ok) {
        // Berhasil hapus! Hapus item dari state tanpa refresh
        setkelasList(kelasList.filter((kelas) => kelas.id !== kelasId));
      } else {
        // Handle error
        alert("Gagal menghapus kelas.");
      }
    } catch (error) {
      alert("Gagal menghapus kelas. Cek koneksi.");
    }
  };

  // TAMBAHKAN FUNGSI BARU UNTUK MENGHANDLE EDIT
  const handleEdit = (kelas) => {
    setEditingkelas(kelas); // Set kelas yang akan diedit
    setIsEditModalOpen(true); // Buka modal
  };

  const handleUpdateSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/dashboard/kelas/${editingkelas.id}/update/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nama: editingkelas.nama }),
        }
      );

      if (response.ok) {
        // Berhasil! Update data di state
        const updatedkelas = await response.json();
        setkelasList(
          kelasList.map((s) => (s.id === updatedkelas.id ? updatedkelas : s))
        );
        // Tutup modal dan reset state
        setIsEditModalOpen(false);
        setEditingkelas(null);
      } else {
        alert("Gagal mengupdate kelas.");
      }
    } catch (error) {
      alert("Gagal mengupdate kelas. Cek koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div>Loading data kelas...</div>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Data kelas</h1>

        {/* FORM UNTUK MENAMBAH KELAS */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-50 p-4 rounded-lg shadow"
        >
          <div className="flex items-center space-x-4">
            {/* Dropdown untuk memilih tingkat */}
            <select
              name="tingkat"
              value={formData.tingkat}
              onChange={(e) =>
                setFormData({ ...formData, tingkat: e.target.value })
              }
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Pilih Tingkat</option>
              <option value="1">Kelas 1</option>
              <option value="2">Kelas 2</option>
              <option value="3">Kelas 3</option>
              <option value="4">Kelas 4</option>
              <option value="5">Kelas 5</option>
              <option value="6">Kelas 6</option>
            </select>

            {/* Input untuk nama kelas */}
            <input
              type="text"
              name="nama_kelas"
              value={formData.nama_kelas}
              onChange={(e) =>
                setFormData({ ...formData, nama_kelas: e.target.value })
              }
              placeholder="Nama Kelas (contoh: A)"
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

        {/* TABEL DAFTAR kelas */}
        <div className="bg-white shadow rounded-lg p-4">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama kelas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {kelasList.map((kelas) => (
                <tr key={kelas.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kelas.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {kelas.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleEdit(kelas)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(kelas.id)}
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
                  Edit kelas
                </h3>
                <form onSubmit={handleUpdateSubmit} className="mt-4">
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nama kelas
                    </label>
                    <input
                      type="text"
                      value={editingkelas.nama}
                      onChange={(e) =>
                        setEditingkelas({
                          ...editingkelas,
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
