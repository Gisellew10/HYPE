const Startup = require("../models/startup");
const Student = require("../models/student");
const Icon = require("../models/icon");

const getStudentProfile = async (userId) => {
	const student = await Student.findOne({ userId: userId });
	if (!student) {
		return [false, null];
	}

	// what was the purpose of this line?
	// student.userId = null;

	return [true, student];
};

const getStartupProfile = async (userId) => {
	const startup = await Startup.findOne({ userId: userId });
	if (!startup) {
		return [false, null];
	}

	// what was the purpose of this line?
	// startup.userId = null;

	return [true, startup];
};

const updateIcon = async (data, userId) => {
	try {

		// Validate data is base64-encoded image
		const base64Regex = /^data:image\/(png|jpeg|jpg);base64,([A-Za-z0-9+/=])+$/;
		if (!base64Regex.test(data)) {
			console.error("Invalid icon data");
			return [false, null];
		}

		const existingIcon = await Icon.findOne({ userId: userId });

		if (existingIcon) {
			existingIcon.data = data;
			await existingIcon.save();

			return [true, existingIcon];
		} else {
			const studentPromise = Student.findOne({ userId: userId });
			const startupPromise = Startup.findOne({ userId: userId });
			const values = await Promise.all([studentPromise, startupPromise]);

			const user = values.filter((value) => value != null)[0];

			if (!user) {
				console.error("User not found");
				return [false, null];
			}

			const icon = new Icon({
				data,
				userId: userId,
			});

			await icon.save();

			user.icon = icon._id;
			await user.save();

			return [true, icon];
		}
	} catch (error) {
		console.error(error);
		return [false, null];
	}
};

const getIcon = async (userId) => {
	try {
		const userIcon = await Icon.findOne({ userId: userId });

		if (!userIcon) {
			console.error("User icon not found");
			return [false, null];
		}

		return [true, userIcon.data];
	} catch (err) {
		console.error(err);
		return [false, null];
	}
};

module.exports = { getStudentProfile, getStartupProfile, updateIcon, getIcon };
