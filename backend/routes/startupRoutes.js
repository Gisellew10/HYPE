const express = require('express');
const router = express.Router();
const { getStartupProfile } = require('../services/accountService.js');
const AuthToken = require("../models/authToken");
const { STUDENT } = require("../constants");
const { editStartupProfile } = require('../services/startupService.js');
const competitionService = require("../services/competitionService.js");

router.use(async (req, res, next) => {

    if (req.method === "OPTIONS") {
        next();
    } else {

        const token = req.get("authtoken");
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Unauthorized - please provide a valid token",
            });
        } else {

            const authToken = await AuthToken.findOne({ authToken: token });
            if (!authToken || authToken.accountType == STUDENT) { //huh this used to be STARTUP instead, idk why. I think it should be STUDENT so I changed it to that
                res.status(401).json({
                    success: false,
                    message: "Unauthorized - authorization token is not valid for a startup",
                });
            } else {
            
                req.userId = authToken.userId;

                next();
            }
        }

    }
});

router.get('/profile', async (req, res) => {
    try {
        const userId = req.userId;
        const [success, startupProfile] = await getStartupProfile(userId);

        if (success) {
            res.status(200).json({
                success: true,
                startupProfile: startupProfile,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Internal server error - valid credential with no associated profile",
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

router.put('/profile', async (req, res) => {
    try {
        const userId = req.userId;
        const { profile } = req.body;
        const [success, startupProfile] = await editStartupProfile(userId, profile);

        if (success) {
            res.status(200).json({
                success: true,
                startupProfile: startupProfile,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Internal server error - unable to edit user",
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

router.post("/competition", async (req, res) => {
	try {
		const userId = req.userId;
		const { prizesRewards, location, format, timeline, eligibilityCriteria, teamSize, goals, purposeTheme, competitionTitle } = req.body;
		if (!competitionTitle || !purposeTheme || !goals || !teamSize || !eligibilityCriteria || !timeline || !format || !location || !prizesRewards) {
			return res.status(400).json({
				success: false,
				message: "Missing required fields",
			});
		}

		const signupResult = await competitionService.createCompetitionService(
			competitionTitle,
			purposeTheme,
			goals,
			teamSize,
			eligibilityCriteria,
			timeline,
			format,
			location,
			prizesRewards,
			userId
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

router.get("/competition/:compID", async (req, res) => {
	try {
        const compID = req.params.compID
		const userId = req.userId;
        const [success, competition] = await competitionService.getCompetitionService(compID);
        if (success) {
            res.status(200).json({
                success: true,
                competition: competition,
                isOwner: competition.createdBy === userId
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error: Access denied",
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

router.get('/competition/registeredTeams/:compID', async (req, res) => {
    try {
        const userId = req.userId;
        const [success, registeredTeams] = await competitionService.getRegisteredTeams(req.params.compID, userId);

        if (success) {
            res.status(200).json({
                success: true,
                registeredTeams: registeredTeams,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Error: Access denied",
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