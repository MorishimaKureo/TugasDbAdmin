# Test API Endpoints

## Prerequisites
- Aplikasi sudah running di `http://localhost:3000`
- Database sudah di-setup

## 1. Test Kategori

### Tambah Kategori
```bash
curl -X POST http://localhost:3000/api/kategori \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik",
    "deskripsi": "Produk elektronik dan gadget"
  }'
```

### Ambil Semua Kategori
```bash
curl http://localhost:3000/api/kategori
```

### Ambil Kategori by ID
```bash
curl http://localhost:3000/api/kategori/1
```

### Update Kategori
```bash
curl -X PUT http://localhost:3000/api/kategori/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik & Gadget",
    "deskripsi": "Produk elektronik, gadget, dan aksesori"
  }'
```

### Hapus Kategori
```bash
curl -X DELETE http://localhost:3000/api/kategori/1
```

---

## 2. Test Supplier

### Tambah Supplier
```bash
curl -X POST http://localhost:3000/api/supplier \
  -H "Content-Type: application/json" \
  -d '{
    "nama_supplier": "PT Elektronik Jaya",
    "alamat": "Jl. Diponegoro No. 42",
    "telepon": "08123456789",
    "email": "info@elektronikjaya.com",
    "kota": "Surabaya"
  }'
```

### Ambil Semua Supplier
```bash
curl http://localhost:3000/api/supplier
```

### Update Supplier
```bash
curl -X PUT http://localhost:3000/api/supplier/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_supplier": "PT Elektronik Jaya Indonesia",
    "alamat": "Jl. Diponegoro No. 42",
    "telepon": "08123456789",
    "email": "contact@elektronikjaya.id",
    "kota": "Surabaya"
  }'
```

---

## 3. Test Produk

### Tambah Produk
```bash
curl -X POST http://localhost:3000/api/produk \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Smartphone Samsung Galaxy A12",
    "id_kategori": 1,
    "id_supplier": 1,
    "harga_beli": 1800000,
    "harga_jual": 2200000,
    "stok": 0,
    "deskripsi": "Smartphone 6.5 inch, RAM 4GB, 64GB storage"
  }'
```

### Ambil Semua Produk dengan Kategori & Supplier
```bash
curl http://localhost:3000/api/produk
```

### Ambil Detail Produk
```bash
curl http://localhost:3000/api/produk/1
```

### Update Produk
```bash
curl -X PUT http://localhost:3000/api/produk/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Smartphone Samsung Galaxy A12",
    "id_kategori": 1,
    "id_supplier": 1,
    "harga_beli": 1750000,
    "harga_jual": 2150000,
    "stok": 5,
    "deskripsi": "Smartphone 6.5 inch, RAM 4GB, 64GB storage - Updated"
  }'
```

---

## 4. Test Pembelian (Stok Masuk)

### Tambah Pembelian (Stok akan otomatis bertambah)
```bash
curl -X POST http://localhost:3000/api/pembelian \
  -H "Content-Type: application/json" \
  -d '{
    "id_produk": 1,
    "id_supplier": 1,
    "jumlah": 10,
    "harga_satuan": 1800000,
    "keterangan": "Pembelian pertama dari supplier"
  }'
```

### Ambil Semua Pembelian
```bash
curl http://localhost:3000/api/pembelian
```

### Detail Pembelian
```bash
curl http://localhost:3000/api/pembelian/1
```

### Update Pembelian
```bash
curl -X PUT http://localhost:3000/api/pembelian/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id_produk": 1,
    "id_supplier": 1,
    "jumlah": 15,
    "harga_satuan": 1750000,
    "keterangan": "Update pembelian - jumlah ditambah"
  }'
```

---

## 5. Test Penjualan (Stok Keluar)

### Tambah Penjualan (Stok akan otomatis berkurang)
```bash
curl -X POST http://localhost:3000/api/penjualan \
  -H "Content-Type: application/json" \
  -d '{
    "id_produk": 1,
    "jumlah": 3,
    "harga_satuan": 2200000,
    "keterangan": "Penjualan ke customer PT ABC"
  }'
```

### Ambil Semua Penjualan
```bash
curl http://localhost:3000/api/penjualan
```

### Detail Penjualan
```bash
curl http://localhost:3000/api/penjualan/1
```

### Update Penjualan
```bash
curl -X PUT http://localhost:3000/api/penjualan/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id_produk": 1,
    "jumlah": 5,
    "harga_satuan": 2250000,
    "keterangan": "Update penjualan - jumlah dan harga"
  }'
```

---

## 6. Test Error Cases

### Penjualan dengan Stok Tidak Cukup
```bash
curl -X POST http://localhost:3000/api/penjualan \
  -H "Content-Type: application/json" \
  -d '{
    "id_produk": 1,
    "jumlah": 999,
    "harga_satuan": 2200000,
    "keterangan": "Penjualan dengan stok tidak cukup"
  }'
```
Response: Error 400 - Stok tidak cukup

### Tambah Produk Tanpa Data Lengkap
```bash
curl -X POST http://localhost:3000/api/produk \
  -H "Content-Type: application/json" \
  -d '{
    "nama_produk": "Produk Tanpa Kategori"
  }'
```
Response: Error 400 - Data produk tidak lengkap

---

## Tools untuk Testing

### Menggunakan Postman
1. Import endpoints ke Postman
2. Set environment variable untuk localhost
3. Jalankan tests sesuai urutan di atas

### Menggunakan VS Code REST Client Extension
Buat file `.http` atau `.rest` dengan content di atas, lalu gunakan Send Request

### Menggunakan curl
Copy-paste commands di atas ke terminal

---

## Catatan Penting

1. **ID Kategori & Supplier:** Pastikan sudah ada sebelum buat produk
2. **Stok Otomatis:** Stok akan terupdate otomatis saat pembelian/penjualan
3. **Validasi:** Penjualan tidak bisa dilakukan jika stok tidak cukup
4. **Transaction:** Pembelian dan penjualan menggunakan transaction untuk konsistensi data
