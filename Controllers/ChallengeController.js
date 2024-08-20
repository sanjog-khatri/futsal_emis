const ChallengeModel = require('../Models/challenge');

const createChallenge =  async (req, res) => {
    try {
        const challenge = new ChallengeModel(req.body);
        await challenge.save();

        res.status(201).json({
            message: 'Challenge created', challenge
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error creating challenge', 
            error: err
        });
    }
};

const acceptChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const challenge = await ChallengeModel.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({
                message: 'Challenge not found'
            });
        } 
        if (challenge.status !== 'pending') {
            return res.status(400).json({
                message: 'Challenge is not in a pending state'
            });
        }

        challenge.status = 'accepted';
        await challenge.save();
        res.status(200).json({
            message: 'Challenge accepted', 
            challenge
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error accepting challenge', 
            error: err
        });
    }
};

const rejectChallenge = async (req, res) => {
    try {
        const { challengeId } = req.params;
        const challenge = await ChallengeModel.findById(challengeId);

        if (!challenge) {
            return res.status(404).json({
                message: 'Challenge not found'
            });
        }
        if (challenge.status !== 'pending') {
            return res.status(400).json({
                message: 'Challenge is not in a pending state'
            });
        }
        challenge.status = 'rejected';
        await challenge.save();
        res.status(200).json({
            message: 'Challenge rejected',
            challenge
        });
    } catch (err) {
        res.status(200).json({
            message: 'Error rejecting challenge',
            error: err
        });
    }
};

module.exports = {
    createChallenge,
    acceptChallenge,
    rejectChallenge
}