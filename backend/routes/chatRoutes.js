const express = require('express');
const router = express.Router();
const { getStartupProfile } = require('../services/accountService.js');
const AuthToken = require("../models/authToken");
const { STARTUP } = require("../constants");
const { getChats, getChat, addMessage, createChat, addMembers, deleteChat, deleteMessage} = require('../services/chatService.js');


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

router.get('/', async (req, res) => {
    try {
        const userId = req.userId;
        const [success, userChats] = await getChats(userId);

        if (success) {
            res.status(200).json({
                success: true,
                userChats: userChats,
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

router.get('/:chatId', async (req, res) => {
    try {
        const userId = req.userId;
        const [success, chatInfo] = await getChat(req.params.chatId, userId);

        if (success) {
            res.status(200).json({
                success: true,
                chatInfo: chatInfo,
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

router.delete('/:chatId', async (req, res) => {
    try {
        const userId = req.userId;
        const [success, chatInfo] = await deleteChat(req.params.chatId, userId);

        if (success) {
            res.status(200).json({
                success: true,
                chatInfo: chatInfo,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to delete chat",
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

router.delete('/deleteMessage/:chatId', async (req, res) => {
    try {
        const {clickedMessageIndex } = req.body;
        const {success, message} = await deleteMessage(req.params.chatId, clickedMessageIndex);

        if (success) {
            res.status(200).json({
                success: true,
                message: message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Unable to delete message",
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

router.post('/', async (req, res) => {
    try {
        const userId = req.userId;
        const { chatname, othersUserId } = req.body;
        const {success, message, chatId} = await createChat(chatname, userId, othersUserId);

        if (success) {
            res.status(200).json({
                success: true,
                message: message,
                chatId: chatId,
            });
        } else {
            res.status(400).json({
                success: false,
                message: message,
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

router.put('/:chatId', async (req, res) => {
    try {
        const userId = req.userId;
        const { message } = req.body;
        const [success, chatInfo] = await addMessage(req.params.chatId, userId, message);

        if (success) {
            res.status(200).json({
                success: true,
                chatInfo: chatInfo,
            });
        } else {
            res.status(400).json({
                success: false,
                message: "Internal server error - unable to create chat",
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

router.put('/updateMembers/:chatId', async (req, res) => {
    try {
        const { members } = req.body;
        const {success, message} = await addMembers(req.params.chatId, members);

        if (success) {
            res.status(200).json({
                success: true,
                message: message,
            });
        } else {
            res.status(400).json({
                success: false,
                message: message,
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