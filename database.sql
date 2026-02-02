-- Database untuk Sistem Inventori Toko
CREATE DATABASE IF NOT EXISTS sistem_inventori;
USE sistem_inventori;

-- Tabel Kategori Produk
CREATE TABLE kategori (
  id_kategori INT AUTO_INCREMENT PRIMARY KEY,
  nama_kategori VARCHAR(100) NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Supplier
CREATE TABLE supplier (
  id_supplier INT AUTO_INCREMENT PRIMARY KEY,
  nama_supplier VARCHAR(100) NOT NULL,
  alamat TEXT,
  telepon VARCHAR(15),
  email VARCHAR(100),
  kota VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Produk
CREATE TABLE produk (
  id_produk INT AUTO_INCREMENT PRIMARY KEY,
  nama_produk VARCHAR(150) NOT NULL,
  id_kategori INT NOT NULL,
  id_supplier INT NOT NULL,
  harga_beli DECIMAL(10, 2) NOT NULL,
  harga_jual DECIMAL(10, 2) NOT NULL,
  stok INT DEFAULT 0,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (id_kategori) REFERENCES kategori(id_kategori) ON DELETE CASCADE,
  FOREIGN KEY (id_supplier) REFERENCES supplier(id_supplier) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Pembelian (Stok Masuk)
CREATE TABLE pembelian (
  id_pembelian INT AUTO_INCREMENT PRIMARY KEY,
  id_produk INT NOT NULL,
  id_supplier INT NOT NULL,
  jumlah INT NOT NULL,
  harga_satuan DECIMAL(10, 2) NOT NULL,
  total_harga DECIMAL(15, 2) NOT NULL,
  tanggal_pembelian TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE,
  FOREIGN KEY (id_supplier) REFERENCES supplier(id_supplier) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabel Penjualan (Stok Keluar)
CREATE TABLE penjualan (
  id_penjualan INT AUTO_INCREMENT PRIMARY KEY,
  id_produk INT NOT NULL,
  jumlah INT NOT NULL,
  harga_satuan DECIMAL(10, 2) NOT NULL,
  total_harga DECIMAL(15, 2) NOT NULL,
  tanggal_penjualan TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  keterangan TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_produk) REFERENCES produk(id_produk) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Index untuk performa query
CREATE INDEX idx_produk_kategori ON produk(id_kategori);
CREATE INDEX idx_produk_supplier ON produk(id_supplier);
CREATE INDEX idx_pembelian_produk ON pembelian(id_produk);
CREATE INDEX idx_penjualan_produk ON penjualan(id_produk);
CREATE INDEX idx_pembelian_tanggal ON pembelian(tanggal_pembelian);
CREATE INDEX idx_penjualan_tanggal ON penjualan(tanggal_penjualan);
