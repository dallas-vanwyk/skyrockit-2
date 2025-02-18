// controllers/applications.js


// import express
const express = require('express');

// create a router
const router = express.Router();

// import User model
const User = require('../models/user.js');

// router logic goes here
// --------------------------------------------- Index
router.get('/', async (req, res) => {
    
    try {
        
        // look up user from req.session
        const currentUser = await User.findById(req.session.user._id);

        // pass in the current user's applications in the context object
        res.render('applications/index.ejs', {
            applications: currentUser.applications,
        });
    
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// --------------------------------------------- Show
router.get('/:applicationId', async (req, res) => {
    
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/show.ejs', {
            application: application,
        });
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };

});

// route for new job app form
// --------------------------------------------- New
router.get('/new', (req, res) => {
    res.render('applications/new.ejs');
});

// route for submitting new job app
// --------------------------------------------- Create
router.post('/', async (req, res) => {

    try {

        // look up user for req.session
        const currentUser = await User.findById(req.session.user._id);

        // req.body is the new form data object
        // push req.body to the applications array of the current user
        currentUser.applications.push(req.body);

        // save changes to the user
        await currentUser.save();

        // redirect back to applications index view
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };

});

// export router for main server file
module.exports = router;
