const express = require('express');
const router = express.Router();

const { getTournaments, createTournament, updateTournament, deleteTournament } = require('../Controllers/TournamentController');

router.get('/',getTournaments);
router.post('/',createTournament);
router.put('/:id',updateTournament);
router.delete('/:id',deleteTournament);

module.exports = router;
