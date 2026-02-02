# API RESPONSE EXAMPLES

Dokumentasi response dari setiap endpoint API

---

## Kategori Endpoints

### GET /api/kategori - Ambil Semua Kategori

**Request:**
```bash
curl http://localhost:3000/api/kategori
```

**Response 200 OK:**
```json
{
  "status": "success",
  "data": [
    {
      "id_kategori": 1,
      "nama_kategori": "Elektronik",
      "deskripsi": "Produk elektronik dan gadget",
      "created_at": "2024-02-15T10:30:00.000Z",
      "updated_at": "2024-02-15T10:30:00.000Z"
    },
    {
      "id_kategori": 2,
      "nama_kategori": "Pakaian",
      "deskripsi": "Pakaian dan aksesori",
      "created_at": "2024-02-15T10:31:00.000Z",
      "updated_at": "2024-02-15T10:31:00.000Z"
    }
  ]
}
```

---

### GET /api/kategori/:id - Ambil Kategori by ID

**Request:**
```bash
curl http://localhost:3000/api/kategori/1
```

**Response 200 OK:**
```json
{
  "status": "success",
  "data": {
    "id_kategori": 1,
    "nama_kategori": "Elektronik",
    "deskripsi": "Produk elektronik dan gadget",
    "created_at": "2024-02-15T10:30:00.000Z",
    "updated_at": "2024-02-15T10:30:00.000Z"
  }
}
```

**Response 404 Not Found:**
```json
{
  "status": "error",
  "message": "Kategori tidak ditemukan"
}
```

---

### POST /api/kategori - Buat Kategori Baru

**Request:**
```bash
curl -X POST http://localhost:3000/api/kategori \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik",
    "deskripsi": "Produk elektronik dan gadget"
  }'
```

**Response 201 Created:**
```json
{
  "status": "success",
  "message": "Kategori berhasil ditambahkan"
}
```

**Response 400 Bad Request (missing required field):**
```json
{
  "status": "error",
  "message": "Nama kategori harus diisi"
}
```

---

### PUT /api/kategori/:id - Update Kategori

**Request:**
```bash
curl -X PUT http://localhost:3000/api/kategori/1 \
  -H "Content-Type: application/json" \
  -d '{
    "nama_kategori": "Elektronik & Gadget",
    "deskripsi": "Produk elektronik, gadget, dan aksesori"
  }'
```

**Response 200 OK:**
```json
{
  "status": "success",
  "message": "Kategori berhasil diupdate"
}
```

---

### DELETE /api/kategori/:id - Hapus Kategori

**Request:**
```bash
curl -X DELETE http://localhost:3000/api/kategori/1
```

**Response 200 OK:**
```json
{
  "status": "success",
  "message": "Kategori berhasil dihapus"
}
```

---

## Supplier Endpoints

### POST /api/supplier - Buat Supplier

**Request:**
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

**Response 201 Created:**
```json
{
  "status": "success",
  "message": "Supplier berhasil ditambahkan"
}
```

---

### GET /api/supplier - Ambil Semua Supplier

**Response 200 OK:**
```json
{
  "status": "success",
  "data": [
    {
      "id_supplier": 1,
      "nama_supplier": "PT Elektronik Jaya",
      "alamat": "Jl. Diponegoro No. 42",
      "telepon": "08123456789",
      "email": "info@elektronikjaya.com",
      "kota": "Surabaya",
      "created_at": "2024-02-15T10:45:00.000Z",
      "updated_at": "2024-02-15T10:45:00.000Z"
    }
  ]
}
```

---

## Produk Endpoints

### POST /api/produk - Buat Produk

**Request:**
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

**Response 201 Created:**
```json
{
  "status": "success",
  "message": "Produk berhasil ditambahkan"
}
```

---

### GET /api/produk - Ambil Semua Produk (dengan JOIN)

**Response 200 OK:**
```json
{
  "status": "success",
  "data": [
    {
      "id_produk": 1,
      "nama_produk": "Smartphone Samsung Galaxy A12",
      "id_kategori": 1,
      "id_supplier": 1,
      "harga_beli": "1800000.00",
      "harga_jual": "2200000.00",
      "stok": 10,
      "deskripsi": "Smartphone 6.5 inch, RAM 4GB, 64GB storage",
      "created_at": "2024-02-15T11:00:00.000Z",
      "updated_at": "2024-02-15T11:00:00.000Z",
      "nama_kategori": "Elektronik",
      "nama_supplier": "PT Elektronik Jaya"
    }
  ]
}
```

---

## Pembelian Endpoints

### POST /api/pembelian - Catat Pembelian (Stok Masuk)

**Request:**
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

**Response 201 Created:**
```json
{
  "status": "success",
  "message": "Pembelian berhasil ditambahkan dan stok diupdate"
}
```

Setelah ini, stok produk ID 1 akan otomatis bertambah 10.

---

### GET /api/pembelian - Ambil Semua Pembelian

**Response 200 OK:**
```json
{
  "status": "success",
  "data": [
    {
      "id_pembelian": 1,
      "id_produk": 1,
      "id_supplier": 1,
      "jumlah": 10,
      "harga_satuan": "1800000.00",
      "total_harga": "18000000.00",
      "tanggal_pembelian": "2024-02-15T11:15:00.000Z",
      "keterangan": "Pembelian pertama dari supplier",
      "created_at": "2024-02-15T11:15:00.000Z",
      "nama_produk": "Smartphone Samsung Galaxy A12",
      "nama_supplier": "PT Elektronik Jaya"
    }
  ]
}
```

---

### PUT /api/pembelian/:id - Update Pembelian

**Request:**
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

**Response 200 OK:**
```json
{
  "status": "success",
  "message": "Pembelian berhasil diupdate"
}
```

Stok akan diupdate sesuai selisih jumlah (15 - 10 = +5 stok).

---

## Penjualan Endpoints

### POST /api/penjualan - Catat Penjualan (Stok Keluar)

**Request:**
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

**Response 201 Created:**
```json
{
  "status": "success",
  "message": "Penjualan berhasil ditambahkan dan stok diupdate"
}
```

Stok produk ID 1 akan otomatis berkurang 3.

---

### POST /api/penjualan - Penjualan dengan Stok Tidak Cukup

**Request:**
```bash
curl -X POST http://localhost:3000/api/penjualan \
  -H "Content-Type: application/json" \
  -d '{
    "id_produk": 1,
    "jumlah": 999,
    "harga_satuan": 2200000,
    "keterangan": "Penjualan besar"
  }'
```

**Response 400 Bad Request:**
```json
{
  "status": "error",
  "message": "Stok tidak cukup. Stok tersedia: 12"
}
```

Penjualan tidak akan diproses jika stok tidak cukup.

---

### GET /api/penjualan - Ambil Semua Penjualan

**Response 200 OK:**
```json
{
  "status": "success",
  "data": [
    {
      "id_penjualan": 1,
      "id_produk": 1,
      "jumlah": 3,
      "harga_satuan": "2200000.00",
      "total_harga": "6600000.00",
      "tanggal_penjualan": "2024-02-15T11:30:00.000Z",
      "keterangan": "Penjualan ke customer PT ABC",
      "created_at": "2024-02-15T11:30:00.000Z",
      "nama_produk": "Smartphone Samsung Galaxy A12"
    }
  ]
}
```

---

### PUT /api/penjualan/:id - Update Penjualan

**Request:**
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

**Response 200 OK:**
```json
{
  "status": "success",
  "message": "Penjualan berhasil diupdate"
}
```

---

## Error Responses

### 400 Bad Request - Missing Field

**Request:**
```bash
curl -X POST http://localhost:3000/api/kategori \
  -H "Content-Type: application/json" \
  -d '{"deskripsi":"Hanya deskripsi"}'
```

**Response:**
```json
{
  "status": "error",
  "message": "Nama kategori harus diisi"
}
```

---

### 404 Not Found

**Request:**
```bash
curl http://localhost:3000/api/kategori/999
```

**Response:**
```json
{
  "status": "error",
  "message": "Kategori tidak ditemukan"
}
```

---

### 500 Internal Server Error

**Response:**
```json
{
  "status": "error",
  "message": "Database connection error"
}
```

---

## Response Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | GET, PUT, DELETE success |
| 201 | Created | POST success |
| 400 | Bad Request | Validation error, missing field |
| 404 | Not Found | Resource tidak ditemukan |
| 500 | Server Error | Database error, unexpected error |

---

## Success Response Format

Semua success response mengikuti format:

```json
{
  "status": "success",
  "data": {...}  // atau message
}
```

---

## Error Response Format

Semua error response mengikuti format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

---

## Tips Testing

1. **Copy-paste curl commands** langsung ke terminal
2. **Sesuaikan ID** dengan data yang ada di database Anda
3. **Perhatikan status code** untuk identifikasi error
4. **Lihat message** untuk penjelasan error
5. **Check database** jika tidak yakin data tersimpan

---

**Happy Testing! 🚀**
