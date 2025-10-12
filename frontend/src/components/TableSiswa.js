// frontend/src/components/TableSiswa.js

"use client";

import { useState, useEffect } from "react";

const TableSiswa = ({ refreshKey }) => {
  const [dataSiswa, setDataSiswa] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/siswa/');
        const result = await response.json();
        setDataSiswa(result);
      } catch (error) {
        console.error("Gagal mengambil data siswa:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshKey]);

  if (loading) {
    return <p>Memuat data...</p>;
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Data Siswa</h3>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              NIS
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nama Lengkap
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Jenis Kelamin
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {dataSiswa.map((siswa) => (
            <tr key={siswa.nis}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{siswa.nis}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{siswa.nama_lengkap}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {siswa.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSiswa;