const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
    futsal: { type: Schema.Types.ObjectId, ref: 'Futsals' },
    player: { type: Schema.Types.ObjectId, ref: 'Players' },
    date: Date,
    timeSlot: String,
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled']},
    challenge: { type: Schema.Types.ObjectId, ref: 'Challenges', default: null}
});

const BookingModel = mongoose.model('Bookings', BookingSchema);
module.exports = BookingModel;