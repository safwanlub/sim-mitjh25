// frontend/src/components/FormSiswa.js

"use client";

import { useState } from "react";

const FormSiswa = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    nis: "",
    nama_lengkap: "",
    jenis_kelamin: "L",
    tanggal_lahir: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/api/siswa/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        onSuccess();
        setFormData({
          nis: "",
          nama_lengkap: "",
          jenis_kelamin: "L",
          tanggal_lahir: "",
        });
      } else {
        const errorData = await response.json();
        alert(
          `Gagal menambah siswa: ${
            errorData.detail || "Terjadi kesalahan yang tidak diketahui."
          }`
        );
      }
    } catch (error) {
      console.error("Error saat mengirim data:", error);
      alert("Gagal terhubung ke server. Coba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Tambah Siswa Baru
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="nis"
            className="block text-sm font-medium text-gray-700"
          >
            NIS
          </label>
          <input
            type="text"
            id="nis"
            name="nis"
            value={formData.nis}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="nama_lengkap"
            className="block text-sm font-medium text-gray-700"
          >
            Nama Lengkap
          </label>
          <input
            type="text"
            id="nama_lengkap"
            name="nama_lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indho-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <label
            htmlFor="jenis_kelamin"
            className="block text-sm font-medium text-gray-700"
          >
            Jenis Kelamin
          </label>
          <select
            id="jenis_kelamin"
            name="jenis_kelamin"
            value={formData.jenis_kelamin}
            onChange={handleChange}
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          >
            <option value="L">Laki-laki</option>
            <option value="P">Perempuan</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="tanggal_lahir"
            className="block text-sm font-medium text-gray-700"
          >
            Tanggal Lahir
          </label>
          <input
            type="date"
            id="tanggal_lahir"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            required
            disabled={isSubmitting}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300 disabled:bg-gray-400"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Siswa"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSiswa;
