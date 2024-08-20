const express = require('express');
const router = express.Router();
const { updateReview, removeReview, getReviews, createReview } = require('../Controllers/ReviewController');

console.log({ createReview, updateReview, removeReview, getReviews });

router.post('/:id', createReview);
router.put('/:id', updateReview);
router.delete('/:id', removeReview);
router.get('/:id', getReviews);

module.exports = router;
