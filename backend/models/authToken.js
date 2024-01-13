const mongoose = require('mongoose');
const {STUDENT, STARTUP} = require('../constants');


const authTokenSchema = new mongoose.Schema({

    userId: {type:String, required:true},
    accountType: {type:String, required:true, enum: [STUDENT, STARTUP]},
    authToken: {type:String, required:true},
    expiry: {type:Date, required:true, default: Date.now() + 1000*60*60*24*7},

});

module.exports = mongoose.model('authTokens', authTokenSchema);
