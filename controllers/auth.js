const bcrypt = require('bcrypt');
const express = require('express');
const db = require('../models');
const router = express.Router();
const { createUserToken } = require('../middleware/auth');
const passport = require('passport');

// URL prefix - /api

// signup - POST /api/signup
router.post('/signup', (req, res) => {
    bcrypt.hash(req.body.password, 10)
        .then(hash => db.User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        }))
        .then(createdUser => res.status(201).json({
            token: createUserToken(req, createdUser),
            user: createdUser
        }))
        .catch(err => {
            console.log(`ERROR in the POST signup:`, err);
            res.status(401).json({ error: err.message })
        })
    // db.User.create(req.body)
    // .then(user => res.json(user))
    // .catch(err => {
    //     console.log(`ERROR in the POST signup:`, err);
    //     res.json({ 'error': err });
    // })
});


// login - POST /api/login
router.post('/login', (req, res) => {
    // res.json({ message: 'LOGIN POST' })
    // if login details are correct (req.body)
    db.User.findOne({ email: req.body.email })
        .then(user => {
            //create and send a token via createUserToken
            res.status(201).json({
                token: createUserToken(req, user),
                user: user
            });
        }).catch(err => {
            //send error
            console.log('Error in the POST login route', err);
            res.status(401).json({ error: err.message })
        })
});

//GET /api/private -Test route
router.get(
    '/private',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
    res.status(200).json({
         message: 'Thou shall pass! to access message'
    });
});

// PUT - /api/user
router.put(
    '/user',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        // //HARD WAY
        // // get the token from the req headers
        // let token = req.headers.authorization.split(' ')[1]
        // let decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        // decode the token to get those sweet payload deets
        // update a user based on the id from token and update info from body
        db.User.findByIdAndUpdate(req.user._id, { name: req.body.name })
            .then(user => {
                res.status(201).json(user);
            });
    }
);


module.exports = router;