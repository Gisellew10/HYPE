const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({

    userId: {type:String, unique:true, required:true },
    icon: {type: mongoose.Schema.Types.ObjectId,ref: 'icons'},
    companyName: {type:String, required:true},

    description: { type: String, default: "No description provided" },
    website: { type: String, default: "No website provided" },
    email: { type: String, default: "No email provided" },
    mission: { type: String, default: "No mission provided" },
    contacts: { type: [{ r_name: String, email: String, position: String, department: String }], default: [] },
    progress: { type: String, default: "No progress provided" },

    chats: { type: [String], default: [] },

},
{
    collection: 'startups'
});

module.exports = mongoose.model('startups', startupSchema);