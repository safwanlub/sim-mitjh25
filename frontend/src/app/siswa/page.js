"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function SiswaPage() {
  // State untuk daftar siswa
  const [siswaList, setSiswaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    nama: "",
    kelas: "",
    nama_lengkap: "",
    tanggal_lahir: "",
    nama_ayah: "",
    nama_ibu: "",
    alamat: "",
    no_hp: "",
    email: "",
  });
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
        setFormData({ nama: "", kelas: "" });
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

        {/* FORM UNTUK MENAMBAH SISWA (DENGAN DROPODOWN KELAS) */}
        <form
          onSubmit={handleSubmit}
          className="mb-6 bg-gray-50 p-4 rounded-lg shadow"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Dropdown untuk memilih kelas */}
            <div>
              <label
                htmlFor="kelas-select"
                className="block text-sm font-medium text-gray-700"
              >
                Pilih Kelas
              </label>
              <select
                id="kelas-select"
                name="kelas"
                value={formData.kelas}
                onChange={(e) =>
                  setFormData({ ...formData, kelas: e.target.value })
                }
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                required
              >
                <option value="">-- Pilih Kelas --</option>
                {/* Ini adalah cara manual, tapi jelas. Kita bisa fetch dari API untuk lebih dinamis */}
                <option value="13">Kelas 1 A</option>
                <option value="14">Kelas 1 B</option>
                <option value="16">Kelas 2 A</option>
                <option value="17">Kelas 2 B</option>
                <option value="19">Kelas 3 A</option>
                <option value="20">Kelas 3 B</option>
                <option value="21">Kelas 4 A</option>
                <option value="22">Kelas 4 B</option>
                <option value="23">Kelas 5 A</option>
                <option value="24">Kelas 5 B</option>
                <option value="25">Kelas 6 A</option>
                <option value="26">Kelas 6 B</option>
                {/* ... tambahkan semua kelas lainnya sesuai data di database lo ... */}
              </select>
            </div>

            {/* Input untuk nama siswa */}
            <div>
              <label
                htmlFor="nama-siswa"
                className="block text-sm font-medium text-gray-700"
              >
                Nama Siswa
              </label>
              <input
                type="text"
                id="nama-siswa"
                name="nama"
                value={formData.nama}
                onChange={(e) =>
                  setFormData({ ...formData, nama: e.target.value })
                }
                placeholder="Masukkan nama siswa"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 disabled:bg-gray-400"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Siswa"}
            </button>
          </div>
        </form>

        {/* TABEL DAFTAR SISWA */}

        {/* TABEL DAFTAR SISWA DENGAN STYLE LEBIH BAIK */}
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Nama Siswa
                </th>
                <th scope="col" className="px-6 py-3">
                  Kelas
                </th>
                <th scope="col" className="px-6 py-3">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {siswaList.map((siswa) => (
                <tr
                  key={siswa.id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {siswa.id}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {siswa.nama}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {siswa.foto_url ? (
                      <img
                        src={siswa.foto_url}
                        alt={siswa.nama}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No Photo</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {siswa.kelas ? siswa.kelas.display_name : "-"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleEdit(siswa)}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(siswa.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
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
