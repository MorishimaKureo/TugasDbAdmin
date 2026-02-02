const express = require('express');
const penjualanController = require('../controllers/penjualanController');

const router = express.Router();

router.get('/', penjualanController.getAllPenjualan);
router.get('/:id', penjualanController.getPenjualanById);
router.post('/', penjualanController.createPenjualan);
router.put('/:id', penjualanController.updatePenjualan);
router.delete('/:id', penjualanController.deletePenjualan);

module.exports = router;
