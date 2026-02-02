const express = require('express');
const produkController = require('../controllers/produkController');

const router = express.Router();

router.get('/', produkController.getAllProduk);
router.get('/:id', produkController.getProdukById);
router.post('/', produkController.createProduk);
router.put('/:id', produkController.updateProduk);
router.delete('/:id', produkController.deleteProduk);

module.exports = router;
