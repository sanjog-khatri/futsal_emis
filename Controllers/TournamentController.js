const TournamentModel = require('../Models/tournament');

const getTournaments = async (req, res) => {
    try {
        const tournaments = await TournamentModel.find().populate('futsal');
        res.status(200).json(tournaments);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching tournaments',
            error: err
        });
    }
};

const createTournament = async (req, res) => {
    try {
        const { name, futsalId, startDate, endDate, details } = req.body;
        const newTournament = new TournamentModel({
            name,
            futsal: futsalId,
            startDate,
            endDate,
            details
        });
        const savedTournament = await newTournament.save();
        res.status(201).json(savedTournament);
    } catch (err) {
        res.status(500).json({
            message: 'Error creating tournament', 
            error: err
        });
    }
};

const updateTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const updatedTournament = await TournamentModel.findByIdAndUpdate(id, updates, { new: true }).populate('futsal');

        if (!updatedTournament) {
            return res.status(404).json({
                message: 'Tournament not found'
            });
        }
        res.status(200).json(updatedTournament);
    } catch (err) {
        res.status(500).json({ 
            message: 'Error updating tournament', error: err
        });
    }
};

const deleteTournament = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTournament = await TournamentModel.findByIdAndDelete(id);
        if (!deletedTournament) {
            return res.status(404).json({
                message: 'Tournament not found'     
            });
        }
        res.status(200).json({
            message: 'Tournament deleted successfully'
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting tournament',
            error: err
        });
    }
};

module.exports = {
    getTournaments,
    createTournament,
    updateTournament,
    deleteTournament
}