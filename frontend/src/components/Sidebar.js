import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "Dashboard", icon: "📊" },
    { path: "/siswa", label: "Data Siswa", icon: "👥" },
    { path: "/guru", label: "Data Guru", icon: "👨‍🏫" },
    { path: "/kelas", label: "Data Kelas", icon: "🏫" },
    { path: "/mapel", label: "Mata Pelajaran", icon: "📚" },
    { path: "/nilai", label: "Input Nilai", icon: "📈" },
    { path: "/jadwal", label: "Jadwal Pelajaran", icon: "📅" },
    { path: "/absensi", label: "Absensi", icon: "✅" },
    { path: "/laporan", label: "Laporan", icon: "📋" },
  ];

  return (
    <aside className="w-64 bg-white shadow-sm">
      <nav className="mt-8">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
              location.pathname === item.path
                ? "bg-blue-50 text-blue-700 border-r-2 border-blue-600"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
