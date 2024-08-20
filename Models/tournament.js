const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TournamentSchema = new Schema({
    futsal: { type: Schema.Types.ObjectId, ref: 'Futsals' },
    name: String,
    date: Date,
    details: String,
    teams: [{ type: Schema.Types.ObjectId, ref: 'Players' }]
});

const TournamentModel = mongoose.model('Tournaments', TournamentSchema);
module.exports = TournamentModel;