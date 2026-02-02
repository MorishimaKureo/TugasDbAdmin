# KONSEP DAN TUJUAN APLIKASI

## 📌 Konsep Aplikasi

Aplikasi **Sistem Manajemen Inventori Toko** adalah aplikasi web-based yang dirancang untuk membantu pemilik dan pengelola toko dalam mengelola stok produk secara efisien dan teratur.

### Latar Belakang
Pengelolaan inventori manual seringkali:
- ❌ Rentan terhadap kesalahan pencatatan
- ❌ Sulit melacak stok barang
- ❌ Tidak bisa memberikan laporan real-time
- ❌ Memakan waktu dan tenaga

### Solusi
Aplikasi ini menyediakan:
- ✅ Pencatatan otomatis pembelian dan penjualan
- ✅ Update stok real-time
- ✅ Data terorganisir dengan struktur database yang baik
- ✅ Laporan dan monitoring inventori
- ✅ Integrasi supplier dan kategori produk

## 🎯 Tujuan Aplikasi

### Tujuan Umum
Menyediakan platform digital untuk manajemen inventori toko yang efisien, akurat, dan mudah digunakan.

### Tujuan Khusus
1. **Mengelola Data Produk** - Mencatat dan memelihara informasi produk dengan detail
2. **Mengelola Pembelian** - Mencatat pembelian dari supplier dengan otomatis update stok
3. **Mengelola Penjualan** - Mencatat penjualan produk dengan validasi stok
4. **Monitoring Stok** - Melihat kondisi stok real-time
5. **Laporan Inventori** - Menghasilkan informasi untuk analisis bisnis
6. **Efisiensi Operasional** - Mengurangi kesalahan dan menghemat waktu

## 🔑 Fitur Utama

### 1. Manajemen Kategori
- Membuat kategori produk
- Edit dan hapus kategori
- Pengelompokan produk berdasarkan jenis

**Contoh Kategori:**
- Elektronik
- Pakaian
- Makanan & Minuman
- Alat Rumah Tangga
- dll

### 2. Manajemen Supplier
- Mencatat data supplier
- Menyimpan informasi kontak dan lokasi
- Referensi untuk pembelian

**Data Supplier:**
- Nama supplier
- Alamat
- Telepon
- Email
- Kota

### 3. Manajemen Produk
- CRUD produk lengkap
- Link ke kategori dan supplier
- Tracking harga beli dan harga jual
- Manajemen stok

**Data Produk:**
- Nama produk
- Kategori
- Supplier
- Harga beli/jual
- Stok
- Deskripsi

### 4. Manajemen Pembelian (Stok Masuk)
- Catat pembelian dari supplier
- Otomatis update stok
- Tracking tanggal dan total harga

**Proses:**
1. Input pembelian (produk, jumlah, harga)
2. Database auto tambah stok produk
3. Simpan history pembelian

### 5. Manajemen Penjualan (Stok Keluar)
- Catat penjualan ke customer
- Validasi stok sebelum penjualan
- Otomatis update stok

**Proses:**
1. Input penjualan (produk, jumlah, harga)
2. Sistem cek apakah stok cukup
3. Jika cukup: auto kurangi stok + simpan history
4. Jika tidak: tampilkan error

## 📊 Struktur Database

### Entitas dan Atribut

#### 1. Kategori
```
id_kategori (PK)
nama_kategori
deskripsi
created_at, updated_at
```

#### 2. Supplier
```
id_supplier (PK)
nama_supplier
alamat
telepon
email
kota
created_at, updated_at
```

#### 3. Produk
```
id_produk (PK)
nama_produk
id_kategori (FK)
id_supplier (FK)
harga_beli
harga_jual
stok
deskripsi
created_at, updated_at
```

#### 4. Pembelian
```
id_pembelian (PK)
id_produk (FK)
id_supplier (FK)
jumlah
harga_satuan
total_harga
tanggal_pembelian
keterangan
created_at
```

#### 5. Penjualan
```
id_penjualan (PK)
id_produk (FK)
jumlah
harga_satuan
total_harga
tanggal_penjualan
keterangan
created_at
```

### Relasi Antar Tabel
```
┌─────────────┐
│  Kategori   │ 1─────N┐
└─────────────┘        │
                      ┌──────────┐
┌─────────────┐    ├─→│  Produk  │
│  Supplier   │──→ │  └──────────┘
└─────────────┘    │   ↓        ↓
                   │  Pembelian Penjualan
                   └─────┬────────┬─
```

**Jenis Relasi:**
- **1:N** - 1 kategori bisa punya banyak produk
- **1:N** - 1 supplier bisa punya banyak produk
- **1:N** - 1 produk bisa punya banyak pembelian
- **1:N** - 1 produk bisa punya banyak penjualan
- **Foreign Key** - Maintain referential integrity

## 🛠️ Teknologi Stack

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Web framework
- **MySQL** - Database relasional

### Tools & Libraries
- **mysql2/promise** - MySQL driver dengan async/await
- **dotenv** - Environment variable management
- **body-parser** - Request body parsing
- **cors** - Cross-origin resource sharing
- **nodemon** - Development auto-reload

## 🔄 Workflow Aplikasi

### 1. Inisialisasi
```
Startup → Connect Database → Ready to Serve
```

### 2. CRUD Operations
```
Client Request → Express Route → Controller → Database Query → Response
```

### 3. Pembelian Flow
```
Input Pembelian
    ↓
Validasi Data
    ↓
Begin Transaction
    ↓
Insert ke tabel pembelian
    ↓
Update stok produk (+)
    ↓
Commit Transaction
    ↓
Success Response
```

### 4. Penjualan Flow
```
Input Penjualan
    ↓
Validasi Data
    ↓
Cek Stok Cukup?
    ├─ Tidak → Error Response
    └─ Ya → Begin Transaction
            ↓
        Insert ke tabel penjualan
            ↓
        Update stok produk (-)
            ↓
        Commit Transaction
            ↓
        Success Response
```

## 📈 Contoh Use Case Bisnis

### Skenario: Toko Elektronik

**Setup Awal:**
1. Buat kategori: Smartphone, Laptop, Aksesori
2. Buat supplier: PT Elektronik Jaya, CV Tech Supply
3. Buat produk: Samsung Galaxy A12, Acer Aspire 5, dll

**Operasional Harian:**
- **Pagi:** Cek stok di aplikasi
- **Tengah hari:** Catat pembelian barang baru dari supplier
- **Sore:** Catat penjualan ke customer
- **Malam:** Lakukan stock opname, verifikasi dengan data aplikasi

**Keuntungan:**
- ✅ Tidak pernah lupa catatan
- ✅ Tau persis stok tersisa
- ✅ Bisa analisis produk paling laris
- ✅ Perhitungan untung/rugi akurat
- ✅ Laporan otomatis

## 💰 Value Proposition

### Untuk Pemilik Toko
1. **Efisiensi** - Otomasi proses inventori
2. **Akurasi** - Mengurangi kesalahan pencatatan
3. **Real-time** - Informasi stok update langsung
4. **Analisis** - Data untuk keputusan bisnis
5. **Skalabilitas** - Bisa scale saat bisnis berkembang

### Untuk Pengguna/Staff
1. **User-friendly** - Interface yang mudah digunakan
2. **Fast** - Respons cepat
3. **Reliable** - Data aman tersimpan
4. **Comprehensive** - Semua fitur dalam satu aplikasi

## 🔐 Keamanan Data

### Implementasi
- ✅ **SQL Injection Prevention** - Menggunakan prepared statements
- ✅ **Data Validation** - Input validation di setiap endpoint
- ✅ **Transaction Safety** - Database transaction untuk consistency
- ✅ **Error Handling** - Error message yang aman
- ✅ **Environment Secrets** - Credentials di .env file

### Integritas Data
- Foreign key constraints
- Referential integrity
- Transaction rollback jika error
- Unique constraints pada data kritis

## 📊 Query SQL Utama

### Select Produk dengan Stok
```sql
SELECT p.id_produk, p.nama_produk, k.nama_kategori, p.stok
FROM produk p
JOIN kategori k ON p.id_kategori = k.id_kategori
ORDER BY p.stok ASC;
```

### Total Pembelian per Supplier
```sql
SELECT s.nama_supplier, COUNT(*) as jumlah_pembelian, SUM(pm.total_harga) as total
FROM pembelian pm
JOIN supplier s ON pm.id_supplier = s.id_supplier
GROUP BY s.id_supplier;
```

### Keuntungan Penjualan
```sql
SELECT 
  p.nama_produk,
  SUM(pj.jumlah) as total_terjual,
  (AVG(pj.harga_satuan) - p.harga_beli) * SUM(pj.jumlah) as keuntungan
FROM penjualan pj
JOIN produk p ON pj.id_produk = p.id_produk
GROUP BY p.id_produk;
```

## 🚀 Deployment & Scaling

### Development
- Node.js development server
- SQLite atau local MySQL
- Testing di localhost

### Production Ready Features
- Connection pooling
- Error handling komprehensif
- Input validation
- Transaction support
- Environment-based configuration

### Siap untuk:
- Deployment ke cloud (Heroku, AWS, Google Cloud)
- Scaling dengan load balancer
- Integration dengan service lain
- Mobile app backend

## 📝 Kesimpulan

Aplikasi **Sistem Manajemen Inventori Toko** adalah solusi lengkap untuk kebutuhan inventori toko modern dengan:

- ✅ Database terstruktur dengan baik
- ✅ API RESTful yang mudah digunakan
- ✅ Security best practices
- ✅ Transaction support untuk data consistency
- ✅ Real-time inventory tracking
- ✅ Scalable architecture

Aplikasi ini memenuhi semua requirement dari tugas database admin dan siap untuk digunakan di production environment.

---

**Presentasi Selesai**
