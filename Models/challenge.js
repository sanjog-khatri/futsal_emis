const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChallengeSchema = new Schema({
   futsal: { type: Schema.Types.ObjectId, ref: 'Futsals'}, 
   player: { type: Schema.Types.ObjectId, ref: 'Players'},
   date: Date,
   status: { type: String, enum: ['pending', 'accepted', 'rejected']}
});

const ChallengeModel = mongoose.model('Challenges', ChallengeSchema);
module.exports = ChallengeModel;