# PANDUAN SETUP DAN RUNNING APLIKASI

## 📋 Langkah-Langkah Setup

### 1. Install Dependencies (SUDAH DONE ✅)
```bash
npm install
```
Dependencies yang diinstall:
- **express** - Web framework
- **mysql2** - MySQL driver dengan promise support
- **dotenv** - Manage environment variables
- **body-parser** - Parse JSON request body
- **cors** - Enable CORS
- **nodemon** - Auto reload saat development

### 2. Setup Database MySQL

#### Option A: Menggunakan Command Line (Recommended)

**Windows (MySQL Command Prompt):**
```bash
mysql -u root -p < database.sql
```

**macOS/Linux (Terminal):**
```bash
mysql -u root -p < database.sql
```

Ketika diminta password, masukkan password root MySQL Anda.

#### Option B: Manual menggunakan MySQL Workbench atau Client

1. Buka MySQL Workbench atau MySQL client
2. Koneksi dengan user `root`
3. Buka file `database.sql` dan jalankan semua SQL statements
4. Atau copy-paste isi file ke client dan execute

#### Option C: Menggunakan phpMyAdmin

1. Buka phpMyAdmin di browser
2. Klik "Import" tab
3. Pilih file `database.sql`
4. Klik "Go" untuk execute

### 3. Konfigurasi Environment Variables

Edit file `.env` sesuai dengan konfigurasi MySQL Anda:

```
DB_HOST=localhost        # Hostname MySQL (default: localhost)
DB_USER=root            # Username MySQL (default: root)
DB_PASSWORD=            # Password MySQL (kosongkan jika tidak ada)
DB_NAME=sistem_inventori # Nama database (JANGAN DIUBAH)
DB_PORT=3306            # Port MySQL (default: 3306)

PORT=3000               # Port aplikasi Node.js
NODE_ENV=development    # Environment (development/production)
```

**Contoh jika punya password:**
```
DB_PASSWORD=my_secret_password
```

### 4. Verifikasi Database Connection

Jalankan aplikasi untuk test connection:
```bash
npm start
```

Jika berhasil, akan muncul:
```
Server berjalan di http://localhost:3000
```

Jika error, cek:
- MySQL service sudah running
- Username/password benar
- Database `sistem_inventori` sudah dibuat
- Port 3306 tidak terblokir

### 5. Test Aplikasi

Buka browser dan akses:
```
http://localhost:3000
```

Akan menampilkan:
```json
{
  "message": "Selamat datang di Sistem Manajemen Inventori Toko",
  "version": "1.0.0",
  "endpoints": {
    "kategori": "/api/kategori",
    "supplier": "/api/supplier",
    "produk": "/api/produk",
    "pembelian": "/api/pembelian (stok masuk)",
    "penjualan": "/api/penjualan (stok keluar)"
  }
}
```

## 🚀 Running Aplikasi

### Development Mode (dengan auto-reload)
```bash
npm run dev
```
Gunakan ini saat development. Aplikasi akan reload otomatis saat ada perubahan file.

### Production Mode
```bash
npm start
```
Gunakan ini saat production untuk performa optimal.

## 🔍 Testing API

### Menggunakan curl (Command Line)

**Test simple GET:**
```bash
curl http://localhost:3000/api/kategori
```

**Test POST dengan data:**
```bash
curl -X POST http://localhost:3000/api/kategori \
  -H "Content-Type: application/json" \
  -d '{"nama_kategori":"Elektronik"}'
```

### Menggunakan Postman

1. Download dan install Postman
2. Import endpoints atau buat collection baru
3. Gunakan contoh dari `API_TEST.md`
4. Test satu per satu

### Menggunakan VS Code REST Client

1. Install extension "REST Client" dari Huachao Mao
2. Buat file test.http
3. Copy endpoints dari `API_TEST.md`
4. Click "Send Request" di atas setiap request

### Menggunakan Browser DevTools

1. Buka DevTools (F12)
2. Buka Console tab
3. Gunakan fetch API:

```javascript
// GET request
fetch('http://localhost:3000/api/kategori')
  .then(r => r.json())
  .then(d => console.log(d))

// POST request
fetch('http://localhost:3000/api/kategori', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({nama_kategori: 'Elektronik'})
})
  .then(r => r.json())
  .then(d => console.log(d))
```

## ⚡ Quick Start Workflow

1. **Setup database** (run database.sql):
   ```bash
   mysql -u root -p < database.sql
   ```

2. **Update .env** dengan config MySQL Anda

3. **Start aplikasi:**
   ```bash
   npm run dev
   ```

4. **Test di browser atau Postman:**
   ```
   http://localhost:3000
   ```

5. **Mulai membuat data:**
   - Buat kategori (POST /api/kategori)
   - Buat supplier (POST /api/supplier)
   - Buat produk (POST /api/produk)
   - Buat pembelian/penjualan (POST /api/pembelian atau /api/penjualan)

## 🐛 Troubleshooting

### Error: "Cannot find module 'express'"
**Solusi:** Run `npm install` untuk install dependencies

### Error: "Access denied for user 'root'@'localhost'"
**Solusi:** 
- Check password di .env sesuai dengan password MySQL Anda
- Atau reset password MySQL

### Error: "Unknown database 'sistem_inventori'"
**Solusi:**
- Run `mysql -u root -p < database.sql` untuk create database
- Atau import database.sql file via MySQL client

### Error: "EADDRINUSE: address already in use :::3000"
**Solusi:**
- Port 3000 sudah digunakan aplikasi lain
- Ubah PORT di .env menjadi port lain (misal 3001)
- Atau stop aplikasi yang menggunakan port 3000

### Data tidak tersimpan
**Solusi:**
- Check apakah response success (status 201/200)
- Lihat di MySQL apakah data benar-benar ada
- Jika ada error, cek MySQL error log

### Stok tidak terupdate otomatis
**Solusi:**
- Pastikan sudah membuat kategori dan supplier dulu
- Cek apakah response dari POST pembelian/penjualan success
- Lihat di MySQL tabel produk field stok apakah berubah

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MySQL2/Promise Documentation](https://github.com/sidorares/node-mysql2)
- [Node.js Documentation](https://nodejs.org/docs/)

## 🎉 Selesai!

Aplikasi siap digunakan. Lanjut ke `API_TEST.md` untuk testing semua endpoints.

---

**Tips:** Jika ingin belajar lebih lanjut:
- Baca kode di `src/controllers/` untuk lihat logic CRUD
- Baca `database.sql` untuk struktur database
- Baca `README.md` untuk dokumentasi API lengkap
