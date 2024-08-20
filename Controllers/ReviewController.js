const FutsalModel = require('../Models/futsal');
const PlayerModel = require('../Models/player');

const createReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;
        const playerId = req.userId;
        const futsalId = req.params.id;

        const futsal = await FutsalModel.findByIdAndUpdate(futsalId, {
            $push: { reviews: { playerId, rating, comment } }
        }, { new: true });

        res.status(201).json({
            message: "review added successfully",
            reviews: futsal.reviews
        });
    } catch (error) {
        res.status(500).json ({
            message: "failed to add review",
            success: false,
            error: error.message
        });
    }
};

const getReviews = async (req, res) => {
    try {
        const futsalId = req.params.id;
        const futsal = await FutsalModel.findById(futsalId).populate('reviews.playerId', 'username');

        if (!futsal) {
            return res.status(404).json({
                message: "Futsal not found",
                success: false
            });
        }

        res.status(200).json({
            message: "Reviews fetched successfully",
            reviews: futsal.reviews
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch reviews",
            success: false,
            error: error.message
        });
    }
};


const updateReview = async (req,res) => {
    try {
        const { rating, comment } = req.body;
        const playerId= req.userId;
        const futsalId = req.params.id;

        const futsal = await FutsalModel.findOneAndUpdate(
            { _id: futsalId, 'reviews.playerId': playerId },
            {
                $set: {
                    'reviews.$.rating': rating,
                    'reviews.$.comment': comment
                }
            },
            { new: true }
        );
        if (!futsal) {
            return res.status(404).json({
                message: "review not found or you are not authorized to update",
                success: false
            });
        }
        res.status(200).json({
            message: "Review updated successfully",
            reviews: futsal.reviews
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update review",
            success: false,
            error: error.message
        });
    }
};

const removeReview = async (req, res) => {
    try {
        const playerId = req.userId;
        const futsalId = req.params.id;

        const futsal = await FutsalModel.findByIdAndUpdate(
            futsalId,
            {
                $pull: { reviews: { playerId } }
            },
            { new: true }
        );
        if (!futsal) {
            return res.status(404).json({
                message: "review not found or you're not authorized",
                success: false
            });
        }
        res.status(200).json({
            message: "review removed successfully",
            reviews: futsal.reviews
        });
    } catch (error) {
        res.status(500).json({
            message: "failed to remove the review",
            success: false,
            error: error.message
        });
    }
};

module.exports = {
    createReview,
    getReviews,
    updateReview,
    removeReview
}
