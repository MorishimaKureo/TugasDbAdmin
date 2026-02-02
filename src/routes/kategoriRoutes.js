const express = require('express');
const kategoriController = require('../controllers/kategoriController');

const router = express.Router();

router.get('/', kategoriController.getAllKategori);
router.get('/:id', kategoriController.getKategoriById);
router.post('/', kategoriController.createKategori);
router.put('/:id', kategoriController.updateKategori);
router.delete('/:id', kategoriController.deleteKategori);

module.exports = router;
