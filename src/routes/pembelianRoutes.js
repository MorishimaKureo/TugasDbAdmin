const express = require('express');
const pembelianController = require('../controllers/pembelianController');

const router = express.Router();

router.get('/', pembelianController.getAllPembelian);
router.get('/:id', pembelianController.getPembelianById);
router.post('/', pembelianController.createPembelian);
router.put('/:id', pembelianController.updatePembelian);
router.delete('/:id', pembelianController.deletePembelian);

module.exports = router;
