import { useState, useEffect } from "react";
import { guruData } from "../data/guru";

export function useGuru() {
  const [guru, setGuru] = useState(guruData);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredGuru = guru.filter(
    (guru) =>
      guru.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guru.nip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addGuru = (newGuru) => {
    const guruWithId = {
      ...newGuru,
      id: Date.now(),
    };
    setGuru([...guru, guruWithId]);
    return guruWithId;
  };

  const updateGuru = (id, updatedGuru) => {
    setGuru(
      guru.map((guru) => (guru.id === id ? { ...guru, ...updatedGuru } : guru))
    );
  };

  const deleteGuru = (id) => {
    setGuru(guru.filter((guru) => guru.id !== id));
  };

  return {
    guru: filteredGuru,
    loading,
    searchTerm,
    setSearchTerm,
    addGuru,
    updateGuru,
    deleteGuru,
  };
}
