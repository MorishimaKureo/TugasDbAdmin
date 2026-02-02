const pool = require('../config/database');

// GET - Ambil semua pembelian
exports.getAllPembelian = async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT pm.*, p.nama_produk, s.nama_supplier 
      FROM pembelian pm
      LEFT JOIN produk p ON pm.id_produk = p.id_produk
      LEFT JOIN supplier s ON pm.id_supplier = s.id_supplier
      ORDER BY pm.id_pembelian DESC
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

// GET - Ambil pembelian by ID
exports.getPembelianById = async (req, res) => {
  try {
    const { id } = req.params;
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT pm.*, p.nama_produk, s.nama_supplier 
      FROM pembelian pm
      LEFT JOIN produk p ON pm.id_produk = p.id_produk
      LEFT JOIN supplier s ON pm.id_supplier = s.id_supplier
      WHERE pm.id_pembelian = ?
    `, [id]);
    connection.release();
    
    if (rows.length === 0) {
      return res.status(404).json({
        status: 'error',
        message: 'Pembelian tidak ditemukan'
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

// POST - Tambah pembelian baru (Stok Masuk)
exports.createPembelian = async (req, res) => {
  try {
    const { id_produk, id_supplier, jumlah, harga_satuan, keterangan } = req.body;
    
    if (!id_produk || !id_supplier || !jumlah || !harga_satuan) {
      return res.status(400).json({
        status: 'error',
        message: 'Data pembelian tidak lengkap'
      });
    }
    
    const total_harga = jumlah * harga_satuan;
    
    const connection = await pool.getConnection();
    
    // Mulai transaction
    await connection.beginTransaction();
    
    try {
      // Insert pembelian
      await connection.query(
        'INSERT INTO pembelian (id_produk, id_supplier, jumlah, harga_satuan, total_harga, keterangan) VALUES (?, ?, ?, ?, ?, ?)',
        [id_produk, id_supplier, jumlah, harga_satuan, total_harga, keterangan || null]
      );
      
      // Update stok produk
      await connection.query(
        'UPDATE produk SET stok = stok + ? WHERE id_produk = ?',
        [jumlah, id_produk]
      );
      
      await connection.commit();
      connection.release();
      
      res.status(201).json({
        status: 'success',
        message: 'Pembelian berhasil ditambahkan dan stok diupdate'
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

// PUT - Update pembelian
exports.updatePembelian = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_produk, id_supplier, jumlah, harga_satuan, keterangan } = req.body;
    
    if (!id_produk || !id_supplier || !jumlah || !harga_satuan) {
      return res.status(400).json({
        status: 'error',
        message: 'Data pembelian tidak lengkap'
      });
    }
    
    const total_harga = jumlah * harga_satuan;
    
    const connection = await pool.getConnection();
    
    // Ambil data lama
    const [oldData] = await connection.query(
      'SELECT * FROM pembelian WHERE id_pembelian = ?',
      [id]
    );
    
    if (oldData.length === 0) {
      connection.release();
      return res.status(404).json({
        status: 'error',
        message: 'Pembelian tidak ditemukan'
      });
    }
    
    await connection.beginTransaction();
    
    try {
      // Update pembelian
      const [result] = await connection.query(
        'UPDATE pembelian SET id_produk = ?, id_supplier = ?, jumlah = ?, harga_satuan = ?, total_harga = ?, keterangan = ? WHERE id_pembelian = ?',
        [id_produk, id_supplier, jumlah, harga_satuan, total_harga, keterangan || null, id]
      );
      
      if (result.affectedRows === 0) {
        throw new Error('Pembelian tidak ditemukan');
      }
      
      // Update stok: kurangi stok lama, tambah stok baru
      const selisih = jumlah - oldData[0].jumlah;
      await connection.query(
        'UPDATE produk SET stok = stok + ? WHERE id_produk = ?',
        [selisih, id_produk]
      );
      
      await connection.commit();
      connection.release();
      
      res.json({
        status: 'success',
        message: 'Pembelian berhasil diupdate'
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

// DELETE - Hapus pembelian
exports.deletePembelian = async (req, res) => {
  try {
    const { id } = req.params;
    
    const connection = await pool.getConnection();
    
    // Ambil data
    const [data] = await connection.query(
      'SELECT * FROM pembelian WHERE id_pembelian = ?',
      [id]
    );
    
    if (data.length === 0) {
      connection.release();
      return res.status(404).json({
        status: 'error',
        message: 'Pembelian tidak ditemukan'
      });
    }
    
    await connection.beginTransaction();
    
    try {
      // Delete pembelian
      await connection.query(
        'DELETE FROM pembelian WHERE id_pembelian = ?',
        [id]
      );
      
      // Kurangi stok
      await connection.query(
        'UPDATE produk SET stok = stok - ? WHERE id_produk = ?',
        [data[0].jumlah, data[0].id_produk]
      );
      
      await connection.commit();
      connection.release();
      
      res.json({
        status: 'success',
        message: 'Pembelian berhasil dihapus'
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
