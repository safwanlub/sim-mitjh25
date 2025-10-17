"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname();

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
    <nav>
      <Link
        href="/dashboard"
        className={pathname === "/dashboard" ? "active" : ""}
      >
        Dashboard
      </Link>
      <Link href="/users" className={pathname === "/users" ? "active" : ""}>
        Users
      </Link>
      <Link href="/siswas" className={pathname === "/siswas" ? "active" : ""}>
        Data Siswa
      </Link>
      <Link href="/gurus" className={pathname === "/gurus" ? "active" : ""}>
        Data Guru
      </Link>
    </nav>
  );
}
