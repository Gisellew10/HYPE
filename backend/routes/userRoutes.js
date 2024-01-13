const express = require("express");
const router = express.Router();
const AuthToken = require("../models/authToken");
const { STUDENT, STARTUP } = require("../constants");
const StudentService = require("../services/studentService");
const { getIcon, updateIcon } = require("../services/accountService");

// Middleware for validating student or startup authorization
router.use(async (req, res, next) => {
	if (req.method === "OPTIONS") {
		return next();
	}

	const token = req.get("authtoken");
	if (!token) {
		return res.status(401).json({
			success: false,
			message: "Unauthorized - please provide a valid token",
		});
	}

	try {
		const authToken = await AuthToken.findOne({ authToken: token });
		if (!authToken) {
			return res.status(401).json({
				success: false,
				message: "Unauthorized - invalid token",
			});
		}

		const { accountType, userId } = authToken;

		if (accountType !== STUDENT && accountType !== STARTUP) {
			return res.status(401).json({
				success: false,
				message:
					"Unauthorized - authorization token is not valid for a student or a startup",
			});
		}

		req.userId = userId;
		req.accountType = accountType;
		next();
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

// Route for listing all students (accessible to both students and startups)
router.get("/students", async (req, res) => {
	try {
		const filters = req.query; // Retrieve the filters from query parameters

		const students = await StudentService.getStudentsFilter(filters);

		res.status(200).json({
			success: true,
			students: students,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
});

router.get("/getIcon/:userId", async (req, res) => {
	try {
		const userId = req.params.userId;
		const [success, iconData] = await getIcon(userId);

		if (success) {
			res.status(200).json({
				success: true,
				icon: iconData,
			});
		} else {
			res.status(500).json({
				success: false,
				message:
					"User does not have an icon",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

router.put("/updateIcon", async (req, res) => {
	try {
		const userId = req.body.userId;
		const icon = req.body.icon;
		const [success, updatedIcon] = await updateIcon(icon, userId);

		if (success) {
			res.status(200).json({
				success: true,
				icon: updatedIcon,
			});
		} else {
			res.status(400).json({
				success: false,
				message: "Internal server error - unable to update icon",
			});
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});
	}
});

router.get("/competition/registeredStudentList", async (req, res) => {
	try {
		const filters = req.query; // Retrieve the filters from query parameters
		const userId = req.body.userId;

		const students = await StudentService.getRegisteredStudentList(filters, userId);

		res.status(200).json({
			success: true,
			students: students,
		});
	} catch (error) {
		console.error(error);

		res.status(500).json({
			success: false,
			message: "Internal server error"
		});
	}
});


module.exports = router;
