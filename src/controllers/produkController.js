const pool = require('../config/database');

// GET - Ambil semua produk
exports.getAllProduk = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT p.*, k.nama_kategori, s.nama_supplier 
      FROM produk p
      LEFT JOIN kategori k ON p.id_kategori = k.id_kategori
      LEFT JOIN supplier s ON p.id_supplier = s.id_supplier
      ORDER BY p.id_produk DESC
    `);
    connection.release();
    
    res.json({
      status: 'success',
      data: rows
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// GET - Ambil produk by ID
exports.getProdukById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT p.*, k.nama_kategori, s.nama_supplier 
      FROM produk p
      LEFT JOIN kategori k ON p.id_kategori = k.id_kategori
      LEFT JOIN supplier s ON p.id_supplier = s.id_supplier
      WHERE p.id_produk = ?
    `, [id]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Produk tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      data: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// POST - Tambah produk baru
exports.createProduk = async (req, res) => {
  try {
    const { nama_produk, id_kategori, id_supplier, harga_beli, harga_jual, stok, deskripsi } = req.body;
    
    if (!nama_produk || !id_kategori || !id_supplier || !harga_beli || !harga_jual) {
      return res.status(400).json({
        status: 'error',
        message: 'Data produk tidak lengkap'
      });
    }
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO produk (nama_produk, id_kategori, id_supplier, harga_beli, harga_jual, stok, deskripsi) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nama_produk, id_kategori, id_supplier, harga_beli, harga_jual, stok || 0, deskripsi || null]
    );
    connection.release();
    
    res.status(201).json({
      status: 'success',
      message: 'Produk berhasil ditambahkan'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// PUT - Update produk
exports.updateProduk = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_produk, id_kategori, id_supplier, harga_beli, harga_jual, stok, deskripsi } = req.body;
    
    if (!nama_produk || !id_kategori || !id_supplier || !harga_beli || !harga_jual) {
      return res.status(400).json({
        status: 'error',
        message: 'Data produk tidak lengkap'
      });
    }
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE produk SET nama_produk = ?, id_kategori = ?, id_supplier = ?, harga_beli = ?, harga_jual = ?, stok = ?, deskripsi = ? WHERE id_produk = ?',
      [nama_produk, id_kategori, id_supplier, harga_beli, harga_jual, stok || 0, deskripsi || null, id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Produk tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Produk berhasil diupdate'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE - Hapus produk
exports.deleteProduk = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM produk WHERE id_produk = ?', [id]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Produk tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Produk berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
