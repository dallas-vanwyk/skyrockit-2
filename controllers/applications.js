// controllers/applications.js


// import express
const express = require('express');

// create a router
const router = express.Router();

// import User model
const User = require('../models/user.js');

// router logic goes here
router.get('/', (req, res) => {
    // res.send('hello job applications index route');
    try {
        res.render('applications/index.ejs')
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});


// export router for main server file
module.exports = router;
