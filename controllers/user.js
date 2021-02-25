const express = require('express');
const db = require('../models');
const router = express.Router();

router.post('/', (req, res) => {
    db.User.findOrCreate({
        where: {
            id: 1,
        }
    })
    .then(([user, created]) => {
        return db.housewife.findOrCreate({
            where: {
                name: req.body.name
            }
        })
        .then(([housewife, created]) => {
            user.addHousewife(housewife).then(relation => {
                res.redirect('/profile')
            })
            .catch(err => console.log(err));
        })
    })
})

// POST /api/profile receive the name of a housewife and add it to the database
router.post('/profile', (req, res) => {
    
})

// DELETE 
router.delete('/profile', (req, res) => {
    db.housewife.destroy({
        where: {
            name: req.body.name
        }
    })
    .then(response => {
        res.redirect('/profile')
    })
    .catch(err => {
        res.status()
    })
})

module.exports(router);