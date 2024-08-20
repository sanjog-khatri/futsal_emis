const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FutsalSchema = new Schema({
    name: String,
    location: String,
    priceWeekday: Number,
    priceSaturday: Number,
    tournaments: [{ type: Schema.Types.ObjectId, ref: 'Tournament'}],
    reviews: [{
        playerId: mongoose.Schema.Types.ObjectId,
        rating: Number,
        comment: String,
        timestamp: { type: Date, default: Date.now }
        }]
    });
    

const FutsalModel = mongoose.model('Futsals', FutsalSchema);
module.exports = FutsalModel;