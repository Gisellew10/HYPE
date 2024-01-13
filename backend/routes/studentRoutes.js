const express = require('express');
const router = express.Router();
const { getStudentProfile } = require('../services/accountService.js');
const AuthToken = require("../models/authToken");
const { STUDENT } = require("../constants");
const { editStudentProfile } = require('../services/studentService.js');
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
                    message: "Unauthorized - authorization token is not valid for a student",
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
        const [success, studentProfile] = await getStudentProfile(userId);

        if (success) {
            res.status(200).json({
                success: true,
                studentProfile: studentProfile,
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
        const [success, studentProfile] = await editStudentProfile(userId, profile);

        if (success) {
            res.status(200).json({
                success: true,
                studentProfile: studentProfile,
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

router.put('/competition/signup/:compID', async (req, res) => {
    try {
        const userId = req.userId;
        const { teamName, othersUserId } = req.body;
        const [success, competition] = await competitionService.addTeams(req.params.compID, teamName, othersUserId, userId);

        if (success) {
            res.status(200).json({
                success: true,
                competition: competition,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Internal server error - unable to add teams",
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