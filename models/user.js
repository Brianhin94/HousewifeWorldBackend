const express = require('express');
const db = require('../models');
const router = express.Router();
// POST /user/profile receive the name of a housewife and add it to the database
router.post('/profile', (req, res) => {
  db.user.findById(req.params.id, function (err, user) {
    if (err) return res.status(500).json({ error: err.message })
  })
})
// DELETE Favorited Housewife
router.delete('/:id', (req, res) => {
  console.log(req.params)
  db.user.findByIdAndDelete(req.user.housewifeId)
    .then(deleteInfo => {
      res.status(204).json({ message: deleteInfo })
    })
    .catch(err => {
      res.status(500).json({ error: err.message })
    })
})