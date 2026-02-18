# 📚 Book Review Web Application

Aplikasi web _full-stack_ untuk ulasan buku yang memungkinkan pengguna melacak bacaan, memberikan penilaian, dan berinteraksi dengan komunitas pembaca. Proyek ini dikembangkan dengan pendekatan _Software Engineering_ (Agile/Scrum) dan terintegrasi dengan OpenLibrary API.

## ✨ Fitur Utama

### 👤 Manajemen Pengguna

- **Autentikasi:** Registrasi dan login pengguna yang aman.
- **Profil & Dasbor:** Pelacakan _reading progress_ (Currently Reading, Finished), statistik membaca tahunan, dan riwayat ulasan.
- **Interaksi Sosial:** _Upvote_ (Helpful) pada ulasan, komentar diskusi, dan fitur _Bookmark/Wishlist_.

### 📖 Katalog Buku & Integrasi API

- **Eksplorasi Dinamis:** Pencarian buku, filter (genre/rating), dan sistem _Tag_ (misal: Fantasy, Romance).
- **Detail Lengkap:** Menampilkan sinopsis, penerbit, tahun terbit, ISBN, dan _cover_ buku yang ditarik secara _real-time_ dari [OpenLibrary API](https://openlibrary.org/dev/docs/api/covers).
- **Rekomendasi:** Daftar buku _trending_ dan rekomendasi berbasis histori bacaan.

### ⭐ Sistem Ulasan

- Penilaian sistem bintang (1-5).
- Ulasan berbasis teks yang mendukung interaksi antarpengguna.

### 🛡️ Panel Admin

- Manajemen _database_ buku (CRUD).
- Moderasi ulasan dan komentar pengguna.

## 🛠️ Teknologi yang Digunakan

- **Frontend:** HTML, JavaScript, Vue.js, Tailwind CSS
- **Backend:** Node.js, Express.js, Axios
- **Database:** PostgreSQL
- **API Eksternal:** OpenLibrary Covers API

## 🚀 Instalasi & Konfigurasi Lokal

### Prasyarat

Pastikan kamu telah menginstal perangkat lunak berikut di sistem komputermu:

- [Node.js](https://nodejs.org/) (v16 atau lebih baru)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

### Langkah Instalasi

1. **Kloning Repositori**
   ```bash
   git clone [https://github.com/username-kamu/nama-repo-kamu.git](https://github.com/username-kamu/nama-repo-kamu.git)
   cd nama-repo-kamu
   ```
