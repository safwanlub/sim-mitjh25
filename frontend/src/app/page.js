import React from "react";
import Layout from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Sistem Manajemen Sekolah
        </h1>
        <p className="text-gray-600">Selamat datang di SIM Sekolah</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Siswa
          </h3>
          <p className="text-3xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Guru
          </h3>
          <p className="text-3xl font-bold text-green-600">56</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Total Kelas
          </h3>
          <p className="text-3xl font-bold text-purple-600">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Mata Pelajaran
          </h3>
          <p className="text-3xl font-bold text-orange-600">24</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <a
            href="/siswa"
            className="bg-blue-50 p-4 rounded-lg text-center hover:bg-blue-100"
          >
            <div className="text-2xl mb-2">👥</div>
            <div className="text-sm font-medium">Data Siswa</div>
          </a>
          <a
            href="/guru"
            className="bg-green-50 p-4 rounded-lg text-center hover:bg-green-100"
          >
            <div className="text-2xl mb-2">👨‍🏫</div>
            <div className="text-sm font-medium">Data Guru</div>
          </a>
          <a
            href="/kelas"
            className="bg-purple-50 p-4 rounded-lg text-center hover:bg-purple-100"
          >
            <div className="text-2xl mb-2">🏫</div>
            <div className="text-sm font-medium">Data Kelas</div>
          </a>
          <a
            href="/mapel"
            className="bg-orange-50 p-4 rounded-lg text-center hover:bg-orange-100"
          >
            <div className="text-2xl mb-2">📚</div>
            <div className="text-sm font-medium">Mata Pelajaran</div>
          </a>
        </div>
      </div>
    </Layout>
  );
}
