const { Siswa } = require("../models"); // Import model Siswa

// Fungsi untuk mendapatkan semua siswa
exports.getAllSiswa = async (req, res) => {
  try {
    const siswaList = await Siswa.findAll();
    res.json(siswaList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Fungsi untuk mendapatkan siswa berdasarkan ID
exports.getSiswaById = async (req, res) => {
  try {
    const siswa = await Siswa.findByPk(req.params.id);
    if (siswa) {
      res.json(siswa);
    } else {
      res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan", error: error.message });
  }
};

// Fungsi untuk menambah siswa baru
exports.createSiswa = async (req, res) => {
  try {
    const newSiswa = await Siswa.create(req.body);
    res.status(201).json(newSiswa);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal menambah siswa", error: error.message });
  }
};

// Fungsi untuk memperbarui data siswa
exports.updateSiswa = async (req, res) => {
  try {
    const [updated] = await Siswa.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedSiswa = await Siswa.findByPk(req.params.id);
      res.json(updatedSiswa);
    } else {
      res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Gagal memperbarui siswa", error: error.message });
  }
};

// Fungsi untuk menghapus siswa
exports.deleteSiswa = async (req, res) => {
  try {
    const deleted = await Siswa.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.json({ message: "Siswa berhasil dihapus" });
    } else {
      res.status(404).json({ message: "Siswa tidak ditemukan" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Gagal menghapus siswa", error: error.message });
  }
};
