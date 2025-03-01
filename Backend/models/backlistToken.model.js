const mongoose = require("mongoose");


const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },

    createAt: {
        type: Date,
        default: Date.now,
        expires: 86400  //24 hour in second
    }
});

module.exports = mongoose.model('backlistToken', blacklistTokenSchema);
