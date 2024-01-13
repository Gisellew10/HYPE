const Student = require("../models/student");

async function getStudentsFilter(filters) {
	const query = {};

	if (filters.name) {
		query.name = { $regex: filters.name, $options: "i" };
	}

	if (filters.experience) {
		query.experience = filters.experience;
	}

	if (filters.commitment) {
		query.commitment = filters.commitment;
	}

	return await Student.find(query);
}

const editStudentProfile = async (userId, profile) => {

    const studentProfile = await Student.findOneAndUpdate({ userId: userId }, 
            { $set:
				{
					description: profile.description,
					github: profile.github,
					skills: profile.skills,
					hobbies: profile.hobbies,
					education: profile.education,
					projects: profile.projects,
					name: profile.name,
					linkedin: profile.linkedin,
					age: profile.age,
					experience: profile.experience,
					commitment: profile.commitment,
					chats: profile.chats,
				}
        }, {
            new: true
          });
    if (!studentProfile) {
        return [false, null];
    }


    return [true, studentProfile];
};

async function getRegisteredStudentList(filters, userId) {
    const query = {};

    if (filters.name) {
        query.name = { $regex: filters.name, $options: "i" };
    }

    if (filters.experience) {
        query.experience = filters.experience;
    }

    if (filters.commitment) {
        query.commitment = filters.commitment;
    }

    if (userId && userId.length > 0) {
        query.userId = { $in: userId }; 
    }

    return await Student.find(query);
}


module.exports = {
	getStudentsFilter, editStudentProfile, getRegisteredStudentList
};
