const pool = require('../config/database');

// GET - Ambil semua supplier
exports.getAllSupplier = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM supplier ORDER BY id_supplier DESC');
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

// GET - Ambil supplier by ID
exports.getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM supplier WHERE id_supplier = ?', [id]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Supplier tidak ditemukan'
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

// POST - Tambah supplier baru
exports.createSupplier = async (req, res) => {
  try {
    const { nama_supplier, alamat, telepon, email, kota } = req.body;
    
    if (!nama_supplier) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama supplier harus diisi'
      });
    }
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO supplier (nama_supplier, alamat, telepon, email, kota) VALUES (?, ?, ?, ?, ?)',
      [nama_supplier, alamat || null, telepon || null, email || null, kota || null]
    );
    connection.release();
    
    res.status(201).json({
      status: 'success',
      message: 'Supplier berhasil ditambahkan'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// PUT - Update supplier
exports.updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_supplier, alamat, telepon, email, kota } = req.body;
    
    if (!nama_supplier) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama supplier harus diisi'
      });
    }
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE supplier SET nama_supplier = ?, alamat = ?, telepon = ?, email = ?, kota = ? WHERE id_supplier = ?',
      [nama_supplier, alamat || null, telepon || null, email || null, kota || null, id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Supplier tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Supplier berhasil diupdate'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE - Hapus supplier
exports.deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM supplier WHERE id_supplier = ?', [id]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Supplier tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Supplier berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
