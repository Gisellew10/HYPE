const express = require('express');
const router = express.Router();
const AuthToken = require("../models/authToken.js");
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
            if (!authToken) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized - authorization token is not valid",
                });
            } else {
                req.userId = authToken.userId;
                next();
            }
        }

    }
});


router.get("/:compID", async (req, res) => {
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


router.get("/", async (req, res) => {
	try {
		const userId = req.userId;
        const [success, competition] = await competitionService.getAllCompetitionService(userId);
        if (success) {
            res.status(200).json({
                success: true,
                data: competition
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