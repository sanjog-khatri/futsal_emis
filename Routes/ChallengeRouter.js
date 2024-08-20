const express = require('express');
const router = express.Router();

const { createChallenge, acceptChallenge, rejectChallenge } = require('../Controllers/ChallengeController');

router.post('/',createChallenge);
router.post('/:challengeId/accept',acceptChallenge);
router.post('/:challengeId/reject',rejectChallenge);

module.exports = router;