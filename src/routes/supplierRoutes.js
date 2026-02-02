const express = require('express');
const supplierController = require('../controllers/supplierController');

const router = express.Router();

router.get('/', supplierController.getAllSupplier);
router.get('/:id', supplierController.getSupplierById);
router.post('/', supplierController.createSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
