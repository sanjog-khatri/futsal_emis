const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
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
});

const OwnerModel = mongoose.model('owners', OwnerSchema);
module.exports = OwnerModel;