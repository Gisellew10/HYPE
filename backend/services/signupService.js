const user = require("../models/user");
const student = require("../models/student");
const startup = require("../models/startup");
const { v4: uuidv4 } = require("uuid");
const { updateIcon } = require("./accountService");
const { DEFAULT_ICONS } = require("../utils/constants");

const signupStudentService = async (
	name,
	password,
	email,
) => {
	try { // try statement may be redundant due to try statement in routes/handler.js
		const existingEmail = await user.findOne({ email });
        if (existingEmail) {
            return { success: false, message: "Email already taken" };
        }

		// random default icon
		const defaultIconData = DEFAULT_ICONS[Math.floor(Math.random() * DEFAULT_ICONS.length)];

		const newUser = new user({
			password,
			email,
			userId: uuidv4(),
		});

		await newUser.save();

		const newStudent = new student({
			userId: newUser.userId,
			name,
		});

		await newStudent.save();

		const [success, newIcon] = await updateIcon(defaultIconData, newUser.userId);

		if (!success) {
			console.error("Error setting default icon");
		}

		return {
			success: true,
			message: "Student account created successfully",
		};
	} catch (err) {
		console.error(err);
		return { success: false, message: "An error occurred during signup" };
	}
};

const signupStartupService = async (companyName, password, email) => {
	try { // try statement may be redundant due to try statement in routes/handler.js
		const existingEmail = await user.findOne({ email });
        if (existingEmail) {
            return { success: false, message: "Email already taken" };
        }

		// random default icon
		const defaultIconData = DEFAULT_ICONS[Math.floor(Math.random() * DEFAULT_ICONS.length)];

		const newUser = new user({
			password,
			email,
			userId: uuidv4(),
		});

		await newUser.save();

		const newStartup = new startup({
			userId: newUser.userId,
			companyName,
		});

		await newStartup.save();

		const [success, newIcon] = await updateIcon(defaultIconData, newUser.userId);

		if (!success) {
			console.error("Error setting default icon");
		}

		return {
			success: true,
			message: "Startup account created successfully",
		};
	} catch (err) {
		console.error(err);
		return { success: false, message: "An error occurred during signup" };
	}
};

module.exports = { signupStudentService, signupStartupService };
