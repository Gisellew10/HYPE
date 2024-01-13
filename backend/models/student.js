const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({

    userId: {type:String, unique:true, required:true },
    icon: {type: mongoose.Schema.Types.ObjectId,ref: 'icons'},
    name: {type:String, required:true},

    description: { type: String, default: "No description provided" },
    github: { type: String, default: "No github provided" },
    linkedin: { type: String, default: "No linkedin provided" },
    skills: { type: Array, default: [] },
    education: { type: [{ school: String, address: String, degree: String, start: String, end: String }], default: [] },
    hobbies: { type: [String], default: [] },
    projects: { type: [{ p_name: String, summary: String }], default: [] },

    age: { type: Number, default: 18 },
    experience: { type: String, enum: ['None', '1 year', '2 years', '3 years', '4 years', '5+ years'], default: 'None' },
    commitment: { type: String, enum: ['0-3 hours', '4-7 hours', '8-10 hours', '10+ hours'], default: '0-3 hours' },

    chats: { type: [String], default: [] },

},
{
    collection: 'students'
});

module.exports = mongoose.model('students', studentSchema);