// 1. Import library yang dibutuhkan
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// 2. Load konfigurasi dari file .env
dotenv.config();

// 3. Buat aplikasi Express
const app = express();

// 4. Import models untuk sinkronisasi database
const { sequelize } = require("./models"); // Import objek sequelize dari models/index.js

// 5. Middleware
app.use(cors()); // Izinkan request dari domain lain (frontend)
app.use(express.json()); // Izinkan request dengan format JSON
app.use(express.urlencoded({ extended: true })); // Izinkan request dari form

// 6. Import dan gunakan routes
const siswaRoutes = require("./routes/siswaRoutes");
app.use("/api/siswa", siswaRoutes);

// 7. Route utama untuk testing
app.get("/", (req, res) => {
  res.json({ message: "Selamat datang di API SIM-Sekolah!" });
});

// 8. Tentukan port dan jalankan server
const PORT = process.env.PORT || 3000;

// Fungsi untuk menjalankan server setelah sinkronisasi DB
const startServer = async () => {
  try {
    // Sinkronkan database (buat tabel jika belum ada)
    await sequelize.sync({ alter: true }); // { alter: true } akan memperbarui tabel jika ada perubahan di model
    console.log("Database berhasil disinkronkan.");

    // Jalankan server
    app.listen(PORT, () => {
      console.log(`Server berjalan di http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Gagal menjalankan server:", error);
  }
};

startServer();
