const express = require("express");
const router = express.Router();
const studentRoutes = require("./studentRoutes.js");
const startupRoutes = require("./startupRoutes.js");
const userRoutes = require("./userRoutes.js");
const chatsRoutes = require("./chatRoutes.js");
const competitionRoutes = require("./competitionRoutes.js");

// services imports
const {
	loginStudentService,
	loginStartupService,
} = require("../services/loginService.js");
const signupService = require("../services/signupService.js");

// middleware required for passing data back to frontend
router.use((req, res, next) => {
	res.append("Access-Control-Allow-Origin", ["*"]);
	res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.append(
		"Access-Control-Allow-Headers",
		"authToken, Content-Type, Access-Control-Allow-Origin"
	);
	next();
});

// authenticated routes
router.use("/student", studentRoutes); // student only routes
router.use("/startup", startupRoutes); // startup only routes
router.use("/chats", chatsRoutes); // chat routes
router.use("/user", userRoutes); // Either student or startup routes
router.use("/competition", competitionRoutes); // Either student or startup routes

// unauthenticated routes
router.post("/loginStudent", async (req, res) => {
	try {
		const { email, password } = req.body;

		const [success, authToken] = await loginStudentService(email, password);

		if (success) {
			res.status(200).json({ success: true, authToken: authToken });
		} else {
			res.status(401).json({
				success: false,
				message: "Invalid email / password",
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

router.post("/loginStartup", async (req, res) => {
	try {
		const { email, password } = req.body;

		const [success, authToken] = await loginStartupService(email, password);

		if (success) {
			res.status(200).json({ success: true, authToken: authToken });
		} else {
			res.status(401).json({
				success: false,
				message: "Invalid email / password",
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

router.post("/signupStudent", async (req, res) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const signupResult = await signupService.signupStudentService(
			name,
			password,
			email
		);

		if (signupResult.success) {
			res.status(201).json({
				success: true,
				message: signupResult.message,
			});
		} else {
			res.status(400).json({
				success: false,
				message: signupResult.message,
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

router.post("/signupStartup", async (req, res) => {
	try {
		const { companyName, email, password } = req.body;
		if (!companyName || !email || !password) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const signupResult = await signupService.signupStartupService(
			companyName,
			password,
			email
		);

		if (signupResult.success) {
			res.status(201).json({
				success: true,
				message: signupResult.message,
			});
		} else {
			res.status(400).json({
				success: false,
				message: signupResult.message,
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

module.exports = router;
