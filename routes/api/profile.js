const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');
// Load Validation
const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/experience');
const validateEducationInput = require('../../validation/education');

const router = express.Router();

// @route 	GET api/profile/test
// @desc 		Tests profile route
// @access 	Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

// @route 	GET api/profile/profile
// @desc 		Get current users profile
// @access 	Private
router.get(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const errors = {};
			const profile = await Profile.findOne({ user: req.user.id }).populate(
				'user',
				['name', 'avatar']
			);

			if (!profile) {
				errors.noprofile = 'There is no profile for this user';
				return res.status(404).json(errors);
			}
			res.json(profile);
		} catch (e) {
			res.status(404).json(e);
		}
	}
);

// @route 	POST api/profile/all
// @desc 		Get all profiles
// @access 	Public
router.get('/all', async (req, res) => {
	const errors = {};
	try {
		const profiles = await Profile.find().populate('user', ['name', 'avatar']);

		if (!profiles) {
			errors.noprofile = 'There are no profiles';
			return res.status(404).json(errors);
		}

		res.json(profiles);
	} catch (e) {
		res.status(404).json({ profile: 'There are no profiles.' });
	}
});

// @route 	POST api/handle/:handle
// @desc 		Get profile by handle
// @access 	Public
router.get('/handle/:handle', async (req, res) => {
	const errors = {};
	try {
		const profile = await Profile.findOne({
			handle: req.params.handle
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		res.json(profile);
	} catch (e) {
		res.status(404).json(e);
	}
});

// @route 	POST api/handle/user/:user_id
// @desc 		Get profile by handle
// @access 	Public
router.get('/user/:user_id', async (req, res) => {
	const errors = {};
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id
		}).populate('user', ['name', 'avatar']);

		if (!profile) {
			errors.noprofile = 'There is no profile for this user';
			return res.status(404).json(errors);
		}

		res.json(profile);
	} catch (e) {
		res.status(404).json({ profile: 'There is no profile for this user' });
	}
});

// @route 	POST api/profile/profile
// @desc 		Create/Update user profile
// @access 	Private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
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
		if (req.body.company || req.body.company === '')
			profileFields.company = req.body.company;
		if (req.body.website || req.body.website === '')
			profileFields.website = req.body.website;
		if (req.body.location || req.body.location === '')
			profileFields.location = req.body.location;
		if (req.body.bio || req.body.bio === '') profileFields.bio = req.body.bio;
		if (req.body.status) profileFields.status = req.body.status;
		if (req.body.githubusername || req.body.githubusername === '')
			profileFields.githubusername = req.body.githubusername;
		// Skills - Split into an array
		if (typeof req.body.skills !== 'undefined') {
			profileFields.skills = req.body.skills.split(',');
		}
		// Social
		profileFields.social = {};
		if (req.body.youtube || req.body.youtube === '')
			profileFields.social.youtube = req.body.youtube;
		if (req.body.twitter || req.body.twitter === '')
			profileFields.social.twitter = req.body.twitter;
		if (req.body.facebook || req.body.facebook === '')
			profileFields.social.facebook = req.body.facebook;
		if (req.body.linkedin || req.body.linkedin === '')
			profileFields.social.linkedin = req.body.linkedin;
		if (req.body.instagram || req.body.instagram === '')
			profileFields.social.instagram = req.body.instagram;

		try {
			const profile = await Profile.findOne({ user: req.user.id });

			if (profile) {
				// Update
				const updateProfile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				res.json(updateProfile);
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
		} catch (e) {
			res.status(400).json(e);
		}
	}
);

// @route 	POST api/profile/experience
// @desc 		Add experience to profile
// @access 	Private
router.post(
	'/experience',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { errors, isValid } = validateExperienceInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			const newExp = {
				title: req.body.title,
				company: req.body.company,
				location: req.body.location,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.experience.unshift(newExp);
			const updatedProfile = await profile.save();
			res.json(updatedProfile);
		} catch (e) {
			res.status(404).json({ profile: 'There is no profile for this user' });
		}
	}
);

// @route 	POST api/profile/education
// @desc 		Add education to profile
// @access 	Private
router.post(
	'/education',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const { errors, isValid } = validateEducationInput(req.body);

		// Check Validation
		if (!isValid) {
			// Return any errors with 400 status
			return res.status(400).json(errors);
		}

		try {
			const profile = await Profile.findOne({ user: req.user.id });
			const newEdu = {
				school: req.body.school,
				degree: req.body.degree,
				fieldofstudy: req.body.fieldofstudy,
				from: req.body.from,
				to: req.body.to,
				current: req.body.current,
				description: req.body.description
			};

			profile.education.unshift(newEdu);
			const updatedProfile = await profile.save();
			res.json(updatedProfile);
		} catch (e) {
			res.status(404).json({ profile: 'There is no profile for this user' });
		}
	}
);

// @route 	DELETE api/profile/experience/:exp_id
// @desc 		Delete experience from profile
// @access 	Private
router.delete(
	'/experience/:exp_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const profile = await Profile.findOne({ user: req.user.id });

			const experience = profile.experience.filter(
				exp => exp.id !== req.params.exp_id
			);
			profile.experience = experience;
			const updatedProfile = await profile.save();
			res.json(updatedProfile);
		} catch (e) {
			res.status(404).json({ profile: 'There is no profile for this user' });
		}
	}
);

// @route 	DELETE api/profile/experience/:edu_id
// @desc 		Delete experience from profile
// @access 	Private
router.delete(
	'/education/:edu_id',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			const profile = await Profile.findOne({ user: req.user.id });

			const education = profile.education.filter(
				edu => edu.id !== req.params.edu_id
			);
			profile.education = education;
			const updatedProfile = await profile.save();
			res.json(updatedProfile);
		} catch (e) {
			res.status(404).json({ profile: 'There is no profile for this user' });
		}
	}
);

// @route 	DELETE api/profile
// @desc 		Delete user and profile
// @access 	Private
router.delete(
	'/',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const profile = await Profile.findOneAndRemove({ user: req.user.id });
		const user = await User.findOneAndRemove({ _id: req.user.id });

		res.json({ success: true });
	}
);

module.exports = router;
