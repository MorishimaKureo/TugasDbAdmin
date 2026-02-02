const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/api/kategori', require('./routes/kategoriRoutes'));
app.use('/api/supplier', require('./routes/supplierRoutes'));
app.use('/api/produk', require('./routes/produkRoutes'));
app.use('/api/pembelian', require('./routes/pembelianRoutes'));
app.use('/api/penjualan', require('./routes/penjualanRoutes'));

// Welcome endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Selamat datang di Sistem Manajemen Inventori Toko',
    version: '1.0.0',
    endpoints: {
      kategori: '/api/kategori',
      supplier: '/api/supplier',
      produk: '/api/produk',
      pembelian: '/api/pembelian (stok masuk)',
      penjualan: '/api/penjualan (stok keluar)'
    }
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan server'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
