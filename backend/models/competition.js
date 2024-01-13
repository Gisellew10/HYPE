const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({

    competitiontId: { type: String, unique: true, required: true },
    competitionTitle: {type:String, required:true},

    purposeTheme: { type: String, default: "No purpose or theme provided" },
    goals: { type: String, default: "No goals provided" },
    teamSize: { type: String, default: "No team size provided" },
    eligibilityCriteria: { type: String, default: "No eligibility criteria provided" },
    timeline: { type: String, default: "No timeline provided" },
    format: { type: String, default: "No format provided" },
    location: { type: String, default: "No location provided" },
    prizesRewards: { type: String, default: "No prizes or rewards provided" },
    createdBy: { type: String, default: "No userId yet, just testing" }, //the user (startup) id that created this competition
    registeredTeams: {
        type: [
          { 
              teamName: String,
              userId: [String], 
          },
        ],
        default: [],
      },

},
{
    collection: 'competitions'
});

module.exports = mongoose.model('competitions', competitionSchema);