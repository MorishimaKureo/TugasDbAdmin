# 📱 QUICK START - MULAI DARI SINI

Selamat datang! File ini adalah pintu masuk untuk memulai Sistem Manajemen Inventori Toko.

## ⚡ 5 Menit Setup

### 1. Setup Database (1 menit)
```bash
mysql -u root -p < database.sql
```
Input password MySQL Anda, database akan otomatis terbuat.

### 2. Update .env (1 menit)
Ubah file `.env` sesuai MySQL config Anda:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=          ← Sesuaikan dengan password MySQL
DB_NAME=sistem_inventori
DB_PORT=3306
PORT=3000
```

### 3. Install Dependencies (sudah done ✅)
```bash
npm install
```

### 4. Run Aplikasi (1 menit)
```bash
npm run dev
```

### 5. Test di Browser (1 menit)
Buka: `http://localhost:3000`

Harusnya muncul:
```json
{
  "message": "Selamat datang di Sistem Manajemen Inventori Toko",
  "endpoints": { ... }
}
```

**SELESAI! ✅ Aplikasi sudah siap digunakan!**

---

## 📖 Dokumentasi Tersedia

Setiap file dokumentasi punya tujuan spesifik:

| File | Tujuan | Untuk Siapa |
|------|--------|-----------|
| **README.md** | Dokumentasi lengkap API | Semua orang |
| **SETUP_GUIDE.md** | Panduan setup detail | DevOps / Sistem Admin |
| **API_TEST.md** | Contoh testing semua endpoint | QA / Tester |
| **PROJECT_STRUCTURE.md** | Struktur folder & file | Developer |
| **DEVELOPER_GUIDE.md** | Deep dive ke code | Developer |
| **PRESENTATION.md** | Konsep & tujuan aplikasi | Presenter / Manager |

---

## 🔥 Contoh Testing Cepat (gunakan curl)

### 1. Test GET (Ambil semua kategori)
```bash
curl http://localhost:3000/api/kategori
```
Output: `[]` (kosong, karena belum ada data)

### 2. Test POST (Buat kategori baru)
```bash
curl -X POST http://localhost:3000/api/kategori \
  -H "Content-Type: application/json" \
  -d '{"nama_kategori":"Elektronik","deskripsi":"Produk elektronik"}'
```
Output: Success message

### 3. Test GET lagi (Lihat kategori yang baru dibuat)
```bash
curl http://localhost:3000/api/kategori
```
Output: Data kategori yang baru dibuat

Lebih banyak example? Lihat `API_TEST.md`

---

## 📊 Fitur Utama

```
✅ Manajemen Kategori        (Create, Read, Update, Delete)
✅ Manajemen Supplier        (Create, Read, Update, Delete)
✅ Manajemen Produk          (Create, Read, Update, Delete)
✅ Manajemen Pembelian       (Stok Masuk + Auto Update Stok)
✅ Manajemen Penjualan       (Stok Keluar + Validasi Stok)
✅ Database Relasional       (Foreign Keys, Constraints)
✅ Error Handling            (Validasi Input, Error Response)
✅ Transaction Support       (Data Consistency)
✅ API RESTful              (Standard HTTP Methods)
```

---

## 🗂️ Struktur Folder

```
TugasDbAdmin/
├── src/
│   ├── config/          ← Database config
│   ├── controllers/      ← Business logic
│   ├── routes/          ← API endpoints
│   └── index.js         ← Server utama
├── database.sql         ← SQL script (jalankan ini dulu!)
├── .env                 ← Konfigurasi (edit sesuai config Anda)
├── package.json         ← Dependencies
├── README.md            ← Dokumentasi API
├── SETUP_GUIDE.md       ← Panduan setup detail
├── API_TEST.md          ← Contoh testing
├── PROJECT_STRUCTURE.md ← Penjelasan struktur
├── DEVELOPER_GUIDE.md   ← Untuk developer
└── PRESENTATION.md      ← Presentasi project
```

---

## 🚀 Command Penting

```bash
# Development mode (auto reload)
npm run dev

# Production mode
npm start

# Install dependencies
npm install

# Setup database
mysql -u root -p < database.sql
```

---

## ❓ Troubleshooting

### Database tidak connect?
1. Pastikan MySQL service running
2. Check `.env` - pastikan username/password benar
3. Run `mysql -u root -p` untuk test connection
4. Run `mysql -u root -p < database.sql` untuk create database

### Port 3000 sudah pakai aplikasi lain?
1. Edit `.env` - ubah PORT ke 3001 atau port lain yang kosong
2. Atau stop aplikasi lain yang pakai port 3000

### Stok tidak terupdate?
1. Pastikan sudah create kategori dan supplier dulu
2. Check response API - pastikan status success
3. Lihat di MySQL: `SELECT * FROM produk;`

Lebih banyak troubleshooting? Lihat `SETUP_GUIDE.md`

---

## 💡 Tips

- **Testing API?** Gunakan Postman atau curl (lihat `API_TEST.md`)
- **Mau extend?** Baca `DEVELOPER_GUIDE.md`
- **Presentasi?** Lihat `PRESENTATION.md`
- **Lupa structure?** Lihat `PROJECT_STRUCTURE.md`
- **Perlu detail?** Lihat `README.md`

---

## ✨ Yang Sudah Included

✅ Aplikasi Node.js lengkap dengan Express  
✅ Database MySQL dengan struktur lengkap  
✅ 5 tabel dengan relasi yang baik  
✅ 5 modul CRUD (Kategori, Supplier, Produk, Pembelian, Penjualan)  
✅ Auto update stok saat pembelian/penjualan  
✅ Validasi input dan error handling  
✅ Transaction support untuk data consistency  
✅ API RESTful yang clean  
✅ Dokumentasi lengkap (ini!)  
✅ Contoh testing API  

---

## 🎯 Next Steps

1. **Setup Database** - Run `database.sql`
2. **Update .env** - Sesuaikan dengan config Anda
3. **Start Server** - Run `npm run dev`
4. **Test API** - Gunakan curl/Postman
5. **Create Data** - Follow contoh di `API_TEST.md`
6. **Explore** - Baca dokumentasi lainnya

---

## 📧 Questions?

Semua yang dibutuhkan sudah di-document:

- API endpoints? → **README.md**
- Cara setup? → **SETUP_GUIDE.md**
- Cara test? → **API_TEST.md**
- Struktur code? → **DEVELOPER_GUIDE.md**
- Konsep aplikasi? → **PRESENTATION.md**

---

**Version:** 1.0.0  
**Status:** Production Ready ✅  
**Last Updated:** Feb 2026

**Selamat menggunakan! 🎉**
