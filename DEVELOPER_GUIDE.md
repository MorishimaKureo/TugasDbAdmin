# DEVELOPER REFERENCE GUIDE

## 📚 Dokumentasi untuk Developer

### Untuk yang ingin memahami atau extend aplikasi

---

## 1. Architecture Overview

### MVC-like Pattern
```
Request
  ↓
Routes (Express Router)
  ↓
Controllers (Business Logic)
  ↓
Database Layer (mysql2/promise)
  ↓
Response JSON
```

### Folder Organization
```
src/
├── config/      - Konfigurasi aplikasi (database)
├── controllers/ - Business logic, validasi, database queries
├── routes/      - API endpoints definition
└── index.js     - Server entry point
```

---

## 2. File by File Explanation

### src/index.js (Main Server)
```javascript
// Setup Express server
// Register middleware (CORS, body-parser)
// Mount routes
// Error handling
// Listen pada PORT
```

**Tanggung Jawab:**
- Inisialisasi Express app
- Setup middleware
- Define routes
- Error handling
- Start server

---

### src/config/database.js (Database Connection)
```javascript
const mysql = require('mysql2/promise');

// Create connection pool
// Configuration dari .env
// Export pool untuk reuse
```

**Konsep:**
- **Connection Pool** - Reuse connections untuk efisiensi
- **Promise-based** - Menggunakan async/await
- **Configuration** - Dari environment variables

**Usage:**
```javascript
const pool = require('./config/database');
const connection = await pool.getConnection();
const [rows] = await connection.query('SELECT ...');
connection.release();
```

---

### src/controllers/kategoriController.js (Contoh Controller)

**Pattern:**
1. **GET all** - Query tanpa WHERE, ORDER BY
2. **GET by ID** - Query dengan WHERE id
3. **POST create** - Validasi, INSERT, response 201
4. **PUT update** - Validasi, UPDATE, check affectedRows
5. **DELETE** - DELETE, check affectedRows

**Error Handling:**
```javascript
try {
  // Do something
} catch (error) {
  return res.status(500).json({
    status: 'error',
    message: error.message
  });
}
```

**Validasi Input:**
```javascript
if (!nama_kategori) {
  return res.status(400).json({
    status: 'error',
    message: 'Nama kategori harus diisi'
  });
}
```

---

### src/controllers/pembelianController.js (Transaction Example)

**Transaction Pattern:**
```javascript
const connection = await pool.getConnection();
await connection.beginTransaction();

try {
  // Query 1: INSERT pembelian
  await connection.query('INSERT ...');
  
  // Query 2: UPDATE stok
  await connection.query('UPDATE ...');
  
  // Commit jika semua sukses
  await connection.commit();
  connection.release();
  
} catch (error) {
  // Rollback jika ada error
  await connection.rollback();
  connection.release();
  throw error;
}
```

**Keuntungan Transaction:**
- ✅ Atomicity - Semua atau tidak sama sekali
- ✅ Consistency - Data selalu konsisten
- ✅ Isolation - Tidak conflict dengan query lain
- ✅ Durability - Data permanent setelah commit

---

### src/routes/ (Route Handlers)

**Pattern:**
```javascript
const express = require('express');
const controller = require('../controllers/kategoriController');

const router = express.Router();

router.get('/', controller.getAllKategori);
router.get('/:id', controller.getKategoriById);
router.post('/', controller.createKategori);
router.put('/:id', controller.updateKategori);
router.delete('/:id', controller.deleteKategori);

module.exports = router;
```

**HTTP Methods:**
- `GET` - Retrieve data
- `POST` - Create data
- `PUT` - Update data
- `DELETE` - Delete data

**Route Params:**
- `:id` - Parameter dari URL
- `req.params.id` - Access parameter
- `req.body` - Access request body (untuk POST/PUT)
- `req.query` - Access query string

---

## 3. Common Patterns

### Getting Data from Database
```javascript
const connection = await pool.getConnection();
const [rows] = await connection.query(
  'SELECT * FROM kategori WHERE id_kategori = ?',
  [id]
);
connection.release();

if (rows.length === 0) {
  return res.status(404).json({ message: 'Not found' });
}

res.json({ status: 'success', data: rows[0] });
```

### Updating Data
```javascript
const [result] = await connection.query(
  'UPDATE kategori SET nama = ? WHERE id = ?',
  [nama, id]
);

if (result.affectedRows === 0) {
  return res.status(404).json({ message: 'Not found' });
}

res.json({ status: 'success', message: 'Updated' });
```

### Deleting Data
```javascript
const [result] = await connection.query(
  'DELETE FROM kategori WHERE id = ?',
  [id]
);

if (result.affectedRows === 0) {
  return res.status(404).json({ message: 'Not found' });
}

res.json({ status: 'success', message: 'Deleted' });
```

### Join Query
```javascript
const [rows] = await connection.query(`
  SELECT p.*, k.nama_kategori, s.nama_supplier
  FROM produk p
  LEFT JOIN kategori k ON p.id_kategori = k.id_kategori
  LEFT JOIN supplier s ON p.id_supplier = s.id_supplier
`);
```

---

## 4. Adding New Feature

### Step 1: Update Database Schema
Edit `database.sql`:
```sql
CREATE TABLE feature (
  id_feature INT AUTO_INCREMENT PRIMARY KEY,
  field1 VARCHAR(100),
  field2 INT,
  FOREIGN KEY (field2) REFERENCES other_table(id)
);
```

### Step 2: Create Controller
Create `src/controllers/featureController.js`:
```javascript
exports.getAllFeature = async (req, res) => { ... };
exports.getFeatureById = async (req, res) => { ... };
exports.createFeature = async (req, res) => { ... };
exports.updateFeature = async (req, res) => { ... };
exports.deleteFeature = async (req, res) => { ... };
```

### Step 3: Create Routes
Create `src/routes/featureRoutes.js`:
```javascript
const router = express.Router();
router.get('/', controller.getAllFeature);
// ... other routes
module.exports = router;
```

### Step 4: Register Routes
Update `src/index.js`:
```javascript
app.use('/api/feature', require('./routes/featureRoutes'));
```

### Step 5: Test
```bash
curl http://localhost:3000/api/feature
```

---

## 5. Testing API

### Using curl
```bash
# GET
curl http://localhost:3000/api/kategori

# POST
curl -X POST http://localhost:3000/api/kategori \
  -H "Content-Type: application/json" \
  -d '{"nama_kategori":"Test"}'

# PUT
curl -X PUT http://localhost:3000/api/kategori/1 \
  -H "Content-Type: application/json" \
  -d '{"nama_kategori":"Updated"}'

# DELETE
curl -X DELETE http://localhost:3000/api/kategori/1
```

### Using Postman
1. Create collection
2. Create requests untuk setiap endpoint
3. Set method (GET/POST/PUT/DELETE)
4. Set URL dan body (untuk POST/PUT)
5. Send dan lihat response

### Using fetch di Browser Console
```javascript
// GET
fetch('http://localhost:3000/api/kategori')
  .then(r => r.json())
  .then(d => console.log(d))

// POST
fetch('http://localhost:3000/api/kategori', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({nama_kategori: 'New'})
})
  .then(r => r.json())
  .then(d => console.log(d))
```

---

## 6. Debugging Tips

### Check Server Logs
```bash
npm run dev
# Lihat console untuk errors dan debug messages
```

### Check Database Directly
```bash
mysql -u root -p sistem_inventori
mysql> SELECT * FROM kategori;
mysql> DESCRIBE kategori;
```

### Add Console Logs
```javascript
console.log('Debug:', variable_name);
```

### Check Network in Browser
```
F12 → Network tab → lihat request/response
```

### Check MySQL Slow Queries
```sql
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;
```

---

## 7. Best Practices

### ✅ DO
- ✅ Use prepared statements (prevent SQL injection)
- ✅ Validate input on server side
- ✅ Use connection pooling
- ✅ Use transactions untuk related operations
- ✅ Close connections/release ke pool
- ✅ Use meaningful variable names
- ✅ Add comments untuk complex logic
- ✅ Use async/await (tidak callback hell)
- ✅ Handle errors properly
- ✅ Use environment variables untuk secrets

### ❌ DON'T
- ❌ Concatenate SQL queries (SQL injection risk)
- ❌ Trust user input
- ❌ Create new connection setiap query
- ❌ Forget to release connections
- ❌ Bare try-catch tanpa handling
- ❌ Hard-code database credentials
- ❌ Store passwords di code
- ❌ Using var (use const/let)
- ❌ Using callback hell (gunakan async/await)
- ❌ Logging sensitive information

---

## 8. Performance Optimization

### Database Level
```javascript
// ✅ Index frequently queried columns
CREATE INDEX idx_produk_kategori ON produk(id_kategori);

// ✅ Use WHERE untuk limit data
SELECT * FROM pembelian WHERE tanggal_pembelian > '2024-01-01';

// ✅ Select only needed columns
SELECT id, nama FROM produk; // tidak SELECT *

// ✅ Use JOIN instead of multiple queries
SELECT p.*, k.nama_kategori FROM produk p
JOIN kategori k ON p.id_kategori = k.id_kategori;
```

### Application Level
```javascript
// ✅ Use connection pooling
const pool = mysql.createPool({ connectionLimit: 10 });

// ✅ Cache result jika possible
const categories = []; // Cache

// ✅ Paginate large results
SELECT * FROM pembelian LIMIT 10 OFFSET 0;

// ✅ Use appropriate data types
DECIMAL(10,2) untuk harga, tidak VARCHAR
```

---

## 9. Troubleshooting Common Issues

### Issue: "Too many connections"
**Cause:** Connection tidak di-release
**Solution:** Pastikan selalu `connection.release()`

### Issue: "Deadlock"
**Cause:** Multiple transactions lock same resource
**Solution:** Optimize query order, use shorter transactions

### Issue: "Stok minus"
**Cause:** Race condition saat concurrent requests
**Solution:** Use transactions dan lock rows

### Issue: "Slow response"
**Cause:** Missing indexes, N+1 queries
**Solution:** Add indexes, use JOIN, optimize queries

### Issue: "Data tidak tersimpan"
**Cause:** Connection error, commit failure
**Solution:** Check connection, error logs, database space

---

## 10. Useful SQL Queries

### Count Total
```sql
SELECT COUNT(*) as total FROM produk;
```

### Sum Column
```sql
SELECT SUM(stok) as total_stok FROM produk;
```

### Group By
```sql
SELECT id_kategori, COUNT(*) FROM produk 
GROUP BY id_kategori;
```

### Order and Limit
```sql
SELECT * FROM penjualan 
ORDER BY tanggal_penjualan DESC 
LIMIT 10;
```

### Date Range
```sql
SELECT * FROM pembelian 
WHERE tanggal_pembelian BETWEEN '2024-01-01' AND '2024-01-31';
```

### Like Search
```sql
SELECT * FROM produk 
WHERE nama_produk LIKE '%phone%';
```

---

## 11. Resources for Learning

- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [MySQL2 Documentation](https://github.com/sidorares/node-mysql2)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [SQL Tutorial](https://www.w3schools.com/sql/)
- [REST API Best Practices](https://restfulapi.net/)

---

## 12. Version Control

### Initialize Git
```bash
git init
git add .
git commit -m "Initial commit: Inventory Management System"
```

### .gitignore (sudah ada)
```
node_modules/
.env
.DS_Store
*.log
```

---

**Happy Coding! 🚀**
