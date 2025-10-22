const express = require("express");
const router = express.Router();
const siswaController = require("../controllers/siswaController");

// Route untuk GET semua siswa
router.get("/", siswaController.getAllSiswa);

// Route untuk GET siswa berdasarkan ID
router.get("/:id", siswaController.getSiswaById);

// Route untuk POST (tambah) siswa baru
router.post("/", siswaController.createSiswa);

// Route untuk PUT (update) siswa
router.put("/:id", siswaController.updateSiswa);

// Route untuk DELETE siswa
router.delete("/:id", siswaController.deleteSiswa);

module.exports = router;
