import "./globals.css"; // Opsional, tapi bagus buat styling global

export const metadata = {
  title: "SIM-MITJH25",
  description: "Sistem Informasi Manajemen Sekolah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
