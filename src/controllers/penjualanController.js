const pool = require('../config/database');

// GET - Ambil semua penjualan
exports.getAllPenjualan = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT pj.*, p.nama_produk 
      FROM penjualan pj
      LEFT JOIN produk p ON pj.id_produk = p.id_produk
      ORDER BY pj.id_penjualan DESC
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

// GET - Ambil penjualan by ID
exports.getPenjualanById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT pj.*, p.nama_produk 
      FROM penjualan pj
      LEFT JOIN produk p ON pj.id_produk = p.id_produk
      WHERE pj.id_penjualan = ?
    `, [id]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Penjualan tidak ditemukan'
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

// POST - Tambah penjualan baru (Stok Keluar)
exports.createPenjualan = async (req, res) => {
  try {
    const { id_produk, jumlah, harga_satuan, keterangan } = req.body;
    
    if (!id_produk || !jumlah || !harga_satuan) {
      return res.status(400).json({
        status: 'error',
        message: 'Data penjualan tidak lengkap'
      });
    }
    
    const total_harga = jumlah * harga_satuan;
    
    const connection = await pool.getConnection();
    
    // Cek stok
    const [produk] = await connection.query(
      'SELECT stok FROM produk WHERE id_produk = ?',
      [id_produk]
    );
    
    if (produk.length === 0) {
      connection.release();
      return res.status(404).json({
        status: 'error',
        message: 'Produk tidak ditemukan'
      });
    }
    
    if (produk[0].stok < jumlah) {
      connection.release();
      return res.status(400).json({
        status: 'error',
        message: `Stok tidak cukup. Stok tersedia: ${produk[0].stok}`
      });
    }
    
    // Mulai transaction
    await connection.beginTransaction();
    
    try {
      // Insert penjualan
      await connection.query(
        'INSERT INTO penjualan (id_produk, jumlah, harga_satuan, total_harga, keterangan) VALUES (?, ?, ?, ?, ?)',
        [id_produk, jumlah, harga_satuan, total_harga, keterangan || null]
      );
      
      // Update stok produk
      await connection.query(
        'UPDATE produk SET stok = stok - ? WHERE id_produk = ?',
        [jumlah, id_produk]
      );
      
      await connection.commit();
      connection.release();
      
      res.status(201).json({
        status: 'success',
        message: 'Penjualan berhasil ditambahkan dan stok diupdate'
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// PUT - Update penjualan
exports.updatePenjualan = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_produk, jumlah, harga_satuan, keterangan } = req.body;
    
    if (!id_produk || !jumlah || !harga_satuan) {
      return res.status(400).json({
        status: 'error',
        message: 'Data penjualan tidak lengkap'
      });
    }
    
    const total_harga = jumlah * harga_satuan;
    
    const connection = await pool.getConnection();
    
    // Ambil data lama
    const [oldData] = await connection.query(
      'SELECT * FROM penjualan WHERE id_penjualan = ?',
      [id]
    );
    
    if (oldData.length === 0) {
      connection.release();
      return res.status(404).json({
        status: 'error',
        message: 'Penjualan tidak ditemukan'
      });
    }
    
    // Cek stok jika ada perubahan
    const selisih = jumlah - oldData[0].jumlah;
    if (selisih > 0) {
      const [produk] = await connection.query(
        'SELECT stok FROM produk WHERE id_produk = ?',
        [id_produk]
      );
      
      if (produk[0].stok < selisih) {
        connection.release();
        return res.status(400).json({
          status: 'error',
          message: `Stok tidak cukup untuk penambahan. Stok tersedia: ${produk[0].stok}`
        });
      }
    }
    
    await connection.beginTransaction();
    
    try {
      // Update penjualan
      const [result] = await connection.query(
        'UPDATE penjualan SET id_produk = ?, jumlah = ?, harga_satuan = ?, total_harga = ?, keterangan = ? WHERE id_penjualan = ?',
        [id_produk, jumlah, harga_satuan, total_harga, keterangan || null, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Penjualan tidak ditemukan');
      }
      
      // Update stok: kembalikan stok lama, kurangi stok baru
      const kurangiStok = jumlah - oldData[0].jumlah;
      await connection.query(
        'UPDATE produk SET stok = stok - ? WHERE id_produk = ?',
        [kurangiStok, id_produk]
      );
      
      await connection.commit();
      connection.release();
      
      res.json({
        status: 'success',
        message: 'Penjualan berhasil diupdate'
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};

// DELETE - Hapus penjualan
exports.deletePenjualan = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    // Ambil data
    const [data] = await connection.query(
      'SELECT * FROM penjualan WHERE id_penjualan = ?',
      [id]
    );
    
    if (data.length === 0) {
      connection.release();
      return res.status(404).json({
        status: 'error',
        message: 'Penjualan tidak ditemukan'
      });
    }
    
    await connection.beginTransaction();
    
    try {
      // Delete penjualan
      await connection.query(
        'DELETE FROM penjualan WHERE id_penjualan = ?',
        [id]
      );
      
      // Kembalikan stok
      await connection.query(
        'UPDATE produk SET stok = stok + ? WHERE id_produk = ?',
        [data[0].jumlah, data[0].id_produk]
      );
      
      await connection.commit();
      connection.release();
      
      res.json({
        status: 'success',
        message: 'Penjualan berhasil dihapus'
      });
    } catch (error) {
      await connection.rollback();
      connection.release();
      throw error;
    }
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
};
