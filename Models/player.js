const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
        username : {
            type : String,
            required : true,
        },

        email : {
            type : String,
            unique : true,
            required : true,
        },

        password : {
            type : String,
            required : true,
        },
        role: {
            type: String,
            default: 'player'
        }
});

const PlayerModel = mongoose.model('players', PlayerSchema);
module.exports = PlayerModel;