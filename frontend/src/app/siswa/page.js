"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";

export default function SiswaPage() {
  // Ini adalah baris yang "mencetak" variabel isLoading
  const [siswaList, setSiswaList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Ini adalah efek yang dijalankan sekali saat halaman dimuat
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

  // Sekarang baris ini tidak akan error lagi, karena isLoading sudah didefinisikan
  if (isLoading) {
    return <div>Loading data siswa...</div>;
  }

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Data Siswa</h1>

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
