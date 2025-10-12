import { useState, useEffect } from "react";
import { siswaData } from "../data/siswa";

export function useSiswa() {
  const [siswa, setSiswa] = useState(siswaData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSiswa = siswa.filter(
    (siswa) =>
      siswa.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      siswa.nis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addSiswa = (newSiswa) => {
    const siswaWithId = {
      ...newSiswa,
      id: Date.now(),
    };
    setSiswa([...siswa, siswaWithId]);
    return siswaWithId;
  };

  const updateSiswa = (id, updatedSiswa) => {
    setSiswa(
      siswa.map((siswa) =>
        siswa.id === id ? { ...siswa, ...updatedSiswa } : siswa
      )
    );
  };

  const deleteSiswa = (id) => {
    setSiswa(siswa.filter((siswa) => siswa.id !== id));
  };

  return {
    siswa: filteredSiswa,
    loading,
    searchTerm,
    setSearchTerm,
    addSiswa,
    updateSiswa,
    deleteSiswa,
  };
}
