# STRUKTUR PROYEK

```
TugasDbAdmin/
├── src/
│   ├── config/
│   │   └── database.js              # Konfigurasi koneksi MySQL
│   ├── controllers/
│   │   ├── kategoriController.js    # Logic CRUD Kategori
│   │   ├── supplierController.js    # Logic CRUD Supplier
│   │   ├── produkController.js      # Logic CRUD Produk
│   │   ├── pembelianController.js   # Logic CRUD Pembelian
│   │   └── penjualanController.js   # Logic CRUD Penjualan
│   ├── routes/
│   │   ├── kategoriRoutes.js        # Routes untuk Kategori
│   │   ├── supplierRoutes.js        # Routes untuk Supplier
│   │   ├── produkRoutes.js          # Routes untuk Produk
│   │   ├── pembelianRoutes.js       # Routes untuk Pembelian
│   │   └── penjualanRoutes.js       # Routes untuk Penjualan
│   └── index.js                     # Main entry point aplikasi
│
├── database.sql                      # SQL script untuk setup database
├── package.json                      # Dependencies dan scripts
├── .env                             # Environment variables
├── .gitignore                       # Git ignore rules
├── README.md                        # Dokumentasi lengkap
└── API_TEST.md                      # Contoh testing API
```

## Penjelasan File

### Core Application
- **src/index.js** - Server Express, setup routes dan middleware

### Database
- **src/config/database.js** - Connection pool MySQL dengan promise
- **database.sql** - Script membuat database dan semua tabel

### Controllers (Business Logic)
Setiap controller menangani CRUD operations:
- GET all data
- GET data by ID
- POST create data (dengan validasi)
- PUT update data
- DELETE data
- Transaction handling untuk konsistensi stok

### Routes
Setiap route file mendefinisikan endpoints RESTful untuk masing-masing resource

### Configuration
- **.env** - Konfigurasi database, port, environment
- **package.json** - Dependencies: express, mysql2, dotenv, cors, body-parser, nodemon

## Data Flow

1. Client kirim request ke endpoint API
2. Express routing mengarahkan ke controller yang sesuai
3. Controller validasi input dan ambil connection dari pool
4. Execute query ke database
5. Return response JSON ke client

## Security Features

✅ Prepared Statements (prevent SQL injection)
✅ Input Validation
✅ Error Handling
✅ Connection Pooling
✅ Environment Variables untuk credentials
✅ CORS enabled
✅ Body Parser untuk JSON handling

## Performance Features

✅ Database Connection Pooling
✅ Indexed columns untuk quick lookup
✅ Async/Await untuk non-blocking operations
✅ Foreign Key constraints untuk data integrity
✅ Transaction untuk consistency
