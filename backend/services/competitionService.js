const user = require("../models/user");
const competition = require("../models/competition");
const Startup = require("../models/startup");
const { v4: uuidv4 } = require("uuid");

const createCompetitionService = async (competitionTitle, purposeTheme, goals, teamSize, eligibilityCriteria, timeline, format, location, prizesRewards, userId) => {
	try { 
        const newCompetition = new competition({
			competitionTitle: competitionTitle,
			purposeTheme: purposeTheme,
			goals: goals,
			teamSize: teamSize,
			eligibilityCriteria: eligibilityCriteria,
			timeline: timeline,
			format: format,
			location: location,
			prizesRewards: prizesRewards,
			createdBy: userId,

			competitiontId: uuidv4(),
		});

        await newCompetition.save();

		return {
			success: true,
			message: "Competition created successfully",
		};
	} catch (err) {
		console.error(err);
		return { success: false, message: "An error occurred during creation" };
	}
};


const getCompetitionService = async (competitionId) => {
	const fcompetition = await competition.findOne({ competitiontId: competitionId });
    if (!fcompetition) {
        return [false, null];
    }
    return [true, fcompetition];
};

const getRegisteredTeams = async (competitionId) => {

    const fcompetition = await competition.findOne({ competitiontId: competitionId });
    if (!fcompetition) {
        return [false, null];
    }
    return [true, fcompetition];
};


const getAllCompetitionService = async (userID) => {
	const fcompetition = await competition.find({});
    if (!fcompetition) {
        return [false, null];
    }

	let cData = fcompetition.map((comp)=>{
		return {
			competition: comp,
			isOwner: comp.createdBy === userID
		}
	})

	const startupPromise = await Startup.findOne({ userId: userID });

	if (startupPromise) {
		cData = cData.filter((c)=> c.isOwner)
	}

    return [true, cData];
};

const addTeams = async (competitionId, teamName, othersUserId, userId) => {

    const fcompetition = await competition.findOneAndUpdate({competitiontId: competitionId}, 
            { $push: { 
                registeredTeams: {
                    $each: [{
						teamName: teamName,
                        userId: [...othersUserId, userId]
                    }],
                }
            }
        }, {
            new: true
          });
    if (!fcompetition) {
        return [false, null];
    }


    return [true, fcompetition];
};

module.exports = { createCompetitionService, getCompetitionService, getRegisteredTeams, addTeams, getAllCompetitionService };
