const BookingModel = require('../Models/booking');
const ChallengeModel = require('../Models/challenge');

const getBookingsForPlayer = async (req, res) => {
    try {
        const bookings = await BookingModel.find({ player: req.userId }).populate('futsal');
        res.status(200).json(bookings);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching bookings',
            error: err
        });
    }
};

const createBooking = async (req, res) => {
    try {
        const booking = new BookingModel(req.body);
        await booking.save();
        res.status(201).json({
            message: 'Booking created', 
            booking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating booking',
            error: err
        });
    }
};

const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        const booking = await BookingModel.findByIdAndUpdate(id, updatedData, { new: true});
        if (!booking) {
            return res.status(404).json({
                message: 'Booking not found', 
                success: false
            });
        }
        res.status(200).json({
            message: 'Booking updated', booking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error updating booking', 
            error: err
        });
    }
};

const cancelBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await BookingModel.findByIdAndDelete(id);

        if(!booking) {
            return res.status(404).json({
                message: 'Booking not found', 
                success: false
            });
        }
        res.status(200).json({
            message: 'Booking cancelled', booking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error cancelling booking', 
            error: err
        });
    }
};

const getChallengesforBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const challenges = await ChallengeModel.find({ booking: bookingId});
        res.status(200).json(challenges);
    } catch (err) {
        res.status(500).json({
            message: 'Error fetching challenges',
            error: err
        });
    }
};

const acceptBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await BookingModel.findById(bookingId);

        if (!booking) return res.status(404).json({
            message: 'Booking not found'
        });
        if (booking.status !== 'pending') return res.status(400).json({
            message: 'Booking cannot be accepted'
        });

        booking.status = 'accepted';
        await booking.save();
        
        res.status(200).json({
            message: 'Booking accepted successfully',
            booking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error acceptiing booking',
            error: err.message
        });
    }
};

const rejectBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const booking = await BookingModel.findById(bookingId);

        if (!booking) return res.status(404).json({
            message: 'Booking not found',
        });
        if (booking.status !== 'pending') 
            return res.status(400).json({
                message: "Booking cannot be rejected"
        });

        booking.status = 'rejected';
        await booking.save();

        res.status(200).json({
            message: 'Booking rejected successfully', 
            booking
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error rejecting booking',
            error: err.message
        });
    }
};

module.exports = {
    createBooking,
    getBookingsForPlayer,
    updateBooking,
    cancelBooking,
    getChallengesforBooking,
    acceptBooking,
    rejectBooking
}