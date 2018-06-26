const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');

const router = express.Router();

// @route 	GET api/profile/test
// @desc 		Tests profile route
// @access 	Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route 	GET api/profile/profile
// @desc 		Get current users profile
// @access 	Private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	try {
		const errors = {};
		const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar'])
		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}
		res.json(profile);
	}	catch (err) {
		res.status(404).json(err);
	}
});


// @route 	POST api/profile/profile
// @desc 		Create/Update user profile
// @access 	Private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
	const { errors, isValid } = validateProfileInput(req.body);

	// Check Validation
	if (!isValid) {
		// Return any errors with 400 status
		return res.status(400).json(errors);
	}

	// Get fields
	const profileFields = {};
	profileFields.user = req.user.id;
	if (req.body.handle) profileFields.handle = req.body.handle;
	if (req.body.company) profileFields.company = req.body.company;
	if (req.body.website) profileFields.website = req.body.website;
	if (req.body.location) profileFields.location = req.body.location;
	if (req.body.bio) profileFields.bio = req.body.bio;
	if (req.body.status) profileFields.status = req.body.status;
	if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
	// Skills - Split into an array
	if (typeof req.body.skills !== 'undefined') {
		profileFields.skills = req.body.skills.split(',');
	}
	// Social
	profileFields.social = {};
	if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
	if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
	if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
	if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
	if (req.body.instagram) profileFields.social.instagram = req.body.instagram;

	const profile = await Profile.findOne({ user: req.user.id });
	
	if (profile) {
		// Update
		const updateProfile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
		res.json(profile);
	} else {
		// Create

		// Check if handle exists
		const profile = await Profile.findOne({ handle: profileFields.handle });
		if (profile) {
			errors.handle = 'That handle already eixsts';
			res.status(400).json(errors);
		}

		// Save Profile
		const newProfile = await new Profile(profileFields).save();
		res.json(newProfile);
	}

});

module.exports = router;
