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

// route for new job app form
// --------------------------------------------- New
router.get('/new', (req, res) => {
    res.render('applications/new.ejs');
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

// --------------------------------------------- Edit
router.get('/:applicationId/edit', async (req, res) => {
    try {

        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/edit.ejs', {
            application: application,
        });

    } catch (error) {
        console.log(error);
        res.redirect('/');
    }
});

// --------------------------------------------- Update
router.put('/:applicationId', async (req, res) => {
    try {
        
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);

        // use Mongoose .set() method
        // updates current app to reflect form data
        application.set(req.body);

        await currentUser.save();

        res.redirect(
            `/users/${currentUser._id}/applications/${req.params.applicationId}`
        );
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});

// --------------------------------------------- Delete
router.delete('/:applicationId', async (req, res) => {
    
    try {
        const currentUser = await User.findById(req.session.user._id);

        // delete the job app using the id from req.params
        currentUser.applications.id(req.params.applicationId).deleteOne();

        await currentUser.save();

        res.redirect('/users/${currentUser._id}/applications');
    } catch (error) {
        console.log(error);
        res.redirect('/');
    };
});


// export router for main server file
module.exports = router;
