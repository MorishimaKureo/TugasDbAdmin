const pool = require('../config/database');

// GET - Ambil semua kategori
exports.getAllKategori = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM kategori ORDER BY id_kategori DESC');
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

// GET - Ambil kategori by ID
exports.getKategoriById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM kategori WHERE id_kategori = ?', [id]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Kategori tidak ditemukan'
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

// POST - Tambah kategori baru
exports.createKategori = async (req, res) => {
  try {
    const { nama_kategori, deskripsi } = req.body;
    
    if (!nama_kategori) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama kategori harus diisi'
      });
    }
    
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO kategori (nama_kategori, deskripsi) VALUES (?, ?)',
      [nama_kategori, deskripsi || null]
    );
    connection.release();
    
    res.status(201).json({
      status: 'success',
      message: 'Kategori berhasil ditambahkan'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// PUT - Update kategori
exports.updateKategori = async (req, res) => {
  try {
    const { id } = req.params;
    const { nama_kategori, deskripsi } = req.body;
    
    if (!nama_kategori) {
      return res.status(400).json({
        status: 'error',
        message: 'Nama kategori harus diisi'
      });
    }
    
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'UPDATE kategori SET nama_kategori = ?, deskripsi = ? WHERE id_kategori = ?',
      [nama_kategori, deskripsi || null, id]
    );
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Kategori tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Kategori berhasil diupdate'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE - Hapus kategori
exports.deleteKategori = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    const [result] = await connection.query('DELETE FROM kategori WHERE id_kategori = ?', [id]);
    connection.release();
    
    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Kategori tidak ditemukan'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Kategori berhasil dihapus'
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
