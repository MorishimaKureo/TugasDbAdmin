# Sistem Manajemen Inventori Toko

Aplikasi Node.js untuk mengelola inventori toko dengan fitur lengkap CRUD (Create, Read, Update, Delete) dan dukungan database MySQL.

## 📋 Daftar Isi
- [Fitur](#fitur)
- [Prasyarat](#prasyarat)
- [Instalasi](#instalasi)
- [Konfigurasi Database](#konfigurasi-database)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [API Endpoints](#api-endpoints)
- [Struktur Database](#struktur-database)

## ✨ Fitur

### 1. Manajemen Kategori
- Tambah, baca, ubah, hapus kategori produk
- Deskripsi kategori

### 2. Manajemen Supplier
- Kelola data supplier
- Informasi kontak (telepon, email)
- Lokasi (alamat, kota)

### 3. Manajemen Produk
- CRUD produk dengan relasi kategori dan supplier
- Tracking harga beli dan harga jual
- Manajemen stok

### 4. Manajemen Pembelian (Stok Masuk)
- Catat pembelian dari supplier
- Otomatis update stok produk
- Tracking tanggal dan total harga

### 5. Manajemen Penjualan (Stok Keluar)
- Catat penjualan produk
- Validasi stok sebelum penjualan
- Otomatis update stok produk
- Tracking keuntungan penjualan

## 🔧 Prasyarat

- Node.js v14 atau lebih tinggi
- MySQL Server (MariaDB atau MySQL)
- npm atau yarn

## 📦 Instalasi

1. **Kloning atau download project**
```bash
cd /path/to/TugasDbAdmin
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup file environment**
Buat atau edit file `.env` dengan konfigurasi database Anda:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password_anda
DB_NAME=sistem_inventori
DB_PORT=3306
PORT=3000
NODE_ENV=development
```

## 🗄️ Konfigurasi Database

1. **Buat database dan tabel**

Buka MySQL client dan jalankan file `database.sql`:
```bash
mysql -u root -p < database.sql
```

Atau manual di MySQL:
```sql
CREATE DATABASE sistem_inventori;
USE sistem_inventori;

-- Paste isi dari file database.sql
```

2. **Verifikasi koneksi**

Database akan otomatis connect saat aplikasi start jika konfigurasi `.env` benar.

## 🚀 Menjalankan Aplikasi

### Development Mode (dengan auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

### Kategori
```
GET    /kategori           - Ambil semua kategori
GET    /kategori/:id       - Ambil kategori by ID
POST   /kategori           - Tambah kategori baru
PUT    /kategori/:id       - Update kategori
DELETE /kategori/:id       - Hapus kategori
```

**Contoh Request POST:**
```json
{
  "nama_kategori": "Elektronik",
  "deskripsi": "Produk elektronik dan gadget"
}
```

### Supplier
```
GET    /supplier           - Ambil semua supplier
GET    /supplier/:id       - Ambil supplier by ID
POST   /supplier           - Tambah supplier baru
PUT    /supplier/:id       - Update supplier
DELETE /supplier/:id       - Hapus supplier
```

**Contoh Request POST:**
```json
{
  "nama_supplier": "PT Aman Jaya",
  "alamat": "Jl. Merdeka No. 123",
  "telepon": "08123456789",
  "email": "info@amanjaya.com",
  "kota": "Jakarta"
}
```

### Produk
```
GET    /produk             - Ambil semua produk
GET    /produk/:id         - Ambil produk by ID
POST   /produk             - Tambah produk baru
PUT    /produk/:id         - Update produk
DELETE /produk/:id         - Hapus produk
```

**Contoh Request POST:**
```json
{
  "nama_produk": "Smartphone Android",
  "id_kategori": 1,
  "id_supplier": 1,
  "harga_beli": 2000000,
  "harga_jual": 2500000,
  "stok": 10,
  "deskripsi": "Smartphone terbaru dengan spesifikasi tinggi"
}
```

### Pembelian (Stok Masuk)
```
GET    /pembelian          - Ambil semua pembelian
GET    /pembelian/:id      - Ambil pembelian by ID
POST   /pembelian          - Tambah pembelian baru
PUT    /pembelian/:id      - Update pembelian
DELETE /pembelian/:id      - Hapus pembelian
```

**Contoh Request POST:**
```json
{
  "id_produk": 1,
  "id_supplier": 1,
  "jumlah": 5,
  "harga_satuan": 2000000,
  "keterangan": "Pembelian pertama"
}
```

### Penjualan (Stok Keluar)
```
GET    /penjualan          - Ambil semua penjualan
GET    /penjualan/:id      - Ambil penjualan by ID
POST   /penjualan          - Tambah penjualan baru
PUT    /penjualan/:id      - Update penjualan
DELETE /penjualan/:id      - Hapus penjualan
```

**Contoh Request POST:**
```json
{
  "id_produk": 1,
  "jumlah": 2,
  "harga_satuan": 2500000,
  "keterangan": "Penjualan ke customer A"
}
```

## 🗃️ Struktur Database

### Tabel Kategori
```
id_kategori (INT, PK, AUTO_INCREMENT)
nama_kategori (VARCHAR(100))
deskripsi (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Tabel Supplier
```
id_supplier (INT, PK, AUTO_INCREMENT)
nama_supplier (VARCHAR(100))
alamat (TEXT)
telepon (VARCHAR(15))
email (VARCHAR(100))
kota (VARCHAR(50))
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Tabel Produk
```
id_produk (INT, PK, AUTO_INCREMENT)
nama_produk (VARCHAR(150))
id_kategori (INT, FK)
id_supplier (INT, FK)
harga_beli (DECIMAL(10,2))
harga_jual (DECIMAL(10,2))
stok (INT)
deskripsi (TEXT)
created_at (TIMESTAMP)
updated_at (TIMESTAMP)
```

### Tabel Pembelian
```
id_pembelian (INT, PK, AUTO_INCREMENT)
id_produk (INT, FK)
id_supplier (INT, FK)
jumlah (INT)
harga_satuan (DECIMAL(10,2))
total_harga (DECIMAL(15,2))
tanggal_pembelian (TIMESTAMP)
keterangan (TEXT)
created_at (TIMESTAMP)
```

### Tabel Penjualan
```
id_penjualan (INT, PK, AUTO_INCREMENT)
id_produk (INT, FK)
jumlah (INT)
harga_satuan (DECIMAL(10,2))
total_harga (DECIMAL(15,2))
tanggal_penjualan (TIMESTAMP)
keterangan (TEXT)
created_at (TIMESTAMP)
```

## 📊 Relasi Database

```
kategori (1) -----(N) produk
supplier (1) -----(N) produk
supplier (1) -----(N) pembelian
produk (1) -----(N) pembelian
produk (1) -----(N) penjualan
```

## 🔐 Catatan Keamanan

- Gunakan prepared statements (sudah implemented)
- Validasi input pada setiap endpoint
- Gunakan environment variables untuk kredensial
- Set database password yang kuat

## 📝 Contoh Workflow Lengkap

1. **Buat Kategori**
   - POST /api/kategori

2. **Buat Supplier**
   - POST /api/supplier

3. **Buat Produk**
   - POST /api/produk (referensi kategori dan supplier)

4. **Catat Pembelian**
   - POST /api/pembelian (stok otomatis bertambah)

5. **Catat Penjualan**
   - POST /api/penjualan (stok otomatis berkurang, dengan validasi)

6. **Monitor Inventori**
   - GET /api/produk (lihat stok real-time)

## 🐛 Troubleshooting

### Koneksi Database Error
- Pastikan MySQL Server sudah berjalan
- Cek konfigurasi `.env`
- Verifikasi username dan password

### Stok Negatif
- Validasi sudah implementasi, stok tidak bisa kurang dari ketersediaan
- Jika ada permasalahan, periksa data pembelian

### Port Sudah Terpakai
- Ubah `PORT` di `.env` atau environment
- Atau berhentikan aplikasi lain yang pakai port yang sama

## 📧 Support
Untuk bantuan lebih lanjut, silakan buat issue atau hubungi administrator.

---

**Version:** 1.0.0  
**Last Updated:** 2026  
**License:** MIT
