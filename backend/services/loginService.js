const bcryptjs = require("bcryptjs");
const { STUDENT, STARTUP } = require("../constants");
const authToken = require("../models/authToken");
const { v4: uuidv4 } = require("uuid");
const user = require("../models/user");
const student = require("../models/student");
const startup = require("../models/startup");

const comparePasswords = async (password, hashedPassword) => {
	const match = await bcryptjs.compare(password, hashedPassword);
	// const match = password === hashedPassword;
	return match;
};

const generateAuthToken = (userAccount, accountType) => {
	return new authToken({
		userId: userAccount.userId,
		authToken: uuidv4(),
		accountType: accountType,
	});
};

const loginStudentService = async (email, password) => {
	try { // try statement may be redundant due to try statement in routes/handler.js

		const userAccount = await user.findOne({ email: email });

		if (!userAccount) {
			return [false, null];
		}

		const passwordMatch = await comparePasswords(
			password,
			userAccount.password
		);

		const studentAccount = await student.findOne({ userId: userAccount.userId });

		if (studentAccount && passwordMatch) {
			const token = generateAuthToken(userAccount, STUDENT);
			await token.save();
	
			return [true, token.authToken];
		}
		else {
			return [false, null];
		}
	} catch (err) {
		console.error(err);
		return [false, null];
	}
};

const loginStartupService = async (email, password) => {
	try { // try statement may be redundant due to try statement in routes/handler.js

		const userAccount = await user.findOne({ email: email });

		if (!userAccount) {
			return [false, null];
		}

		const passwordMatch = await comparePasswords(
			password,
			userAccount.password
		);

		const startupAccount = await startup.findOne({ userId: userAccount.userId });

		if (startupAccount && passwordMatch) {
			const token = generateAuthToken(userAccount, STARTUP);
			await token.save();
	
			return [true, token.authToken];
		}
		else {
			return [false, null];
		}
	} catch (err) {
		console.error(err);
		return [false, null];
	}
};

module.exports = { loginStudentService, loginStartupService };
