import React from "react";
import Layout from "../../components/Layout";
import FormSiswa from "../../components/FormSiswa";
import TableSiswa from "../../components/TableSiswa";
import { useSiswa } from "../../hooks/useSiswa";

export default function SiswaPage() {
  const {
    siswa,
    searchTerm,
    setSearchTerm,
    addSiswa,
    updateSiswa,
    deleteSiswa,
  } = useSiswa();

  const [editingSiswa, setEditingSiswa] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleAddSiswa = (siswaData) => {
    addSiswa(siswaData);
    setShowForm(false);
  };

  const handleEditSiswa = (siswaData) => {
    updateSiswa(siswaData.id, siswaData);
    setEditingSiswa(null);
    setShowForm(false);
  };

  const handleDeleteSiswa = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus siswa ini?")) {
      deleteSiswa(id);
    }
  };

  return (
    <Layout>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Manajemen Siswa
            </h1>
            <p className="text-gray-600">Kelola data siswa sekolah</p>
          </div>
          <button
            onClick={() => {
              setEditingSiswa(null);
              setShowForm(true);
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Tambah Siswa
          </button>
        </div>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Cari siswa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>

      {showForm && (
        <div className="mb-6">
          <FormSiswa
            siswa={editingSiswa}
            onSubmit={editingSiswa ? handleEditSiswa : handleAddSiswa}
            onCancel={() => {
              setShowForm(false);
              setEditingSiswa(null);
            }}
          />
        </div>
      )}

      <TableSiswa
        siswa={siswa}
        onEdit={(siswa) => {
          setEditingSiswa(siswa);
          setShowForm(true);
        }}
        onDelete={handleDeleteSiswa}
      />
    </Layout>
  );
}
