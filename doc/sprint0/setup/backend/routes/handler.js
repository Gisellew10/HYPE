const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

router.get('/tweets', async (req, res) => {
    const tweets = Schemas.Tweets;

    const userTweets = await tweets.find({}).populate("user").exec((err, tweetData) => {
        if (err) throw err;
        if (tweetData) {
            res.end(JSON.stringify(tweetData));
        } else {
            res.end();
        }
    });
});

router.post('/addTweet', async (req, res) => {
    const userTweet = req.body.tweetInput;
    const user = Schemas.Users;
    const userId = await user.findOne({username:'Jenny123'}).exec();

    const newTweet = new Schemas.Tweets({
        tweet: userTweet,
        user: userId._id
    });

    try {
        await newTweet.save( (err, newTweetResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/tweets');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/tweets');
        res.end();
    }
});

module.exports = router;