
const Startup = require("../models/startup");

const editStartupProfile = async (userId, profile) => {

    const startupProfile = await Startup.findOneAndUpdate({ userId: userId }, 
            { $set:
				{
					companyName: profile.companyName,
                    description: profile.description,
					website: profile.website,
					email: profile.email,
					mission: profile.mission,
					contacts: profile.contacts,
					progress: profile.progress
				}
        }, {
            new: true
          });
    if (!startupProfile) {
        return [false, null];
    }


    return [true, startupProfile];
};

module.exports = {
	editStartupProfile,
};
