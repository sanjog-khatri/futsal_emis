const express = require('express');
const router = express.Router();
const { getFutsals, getFutsalById, createFutsal, updateFutsal, deleteFutsal } = require('../Controllers/FutsalController');

router.get('/',getFutsals);
router.get('/:id',getFutsalById);
router.post('/',createFutsal);
router.put('/:id',updateFutsal);
router.delete('/:id',deleteFutsal);

module.exports = router;
