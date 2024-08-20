
const PlayerModel = require('../Models/player');
const OwnerModel = require('../Models/owner');

const authorizeRoles = (roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) return res.status(401).json({
                message: 'Unauthorized'
            });
            const { _id, role } = req.user;

            let user;
            if (role === 'player') {
                user = await PlayerModel.findById(_id);
            } else if (role === 'owner') {
                user = await OwnerModel.findById(id);
            }

            if (!user) return res.status(401).json({
                message: 'user not found'
            });

            if (!roles.include(role)) {
                return res.status(403).json({
                    message: 'Forbidden: You do not have the required role'
                });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized',
                error: error.message
            });
        }
    };
};

module.exports = authorizeRoles;