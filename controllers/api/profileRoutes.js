const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a pet profile
router.post('/createProfile', withAuth, async (req, res) => {
    try {
        const petData = await Pet.create({
            user_id: req.session.user_id,
            name: req.body.name,
            profilePicture: req.body.profilePicture,
            age: req.body.age,
            description: req.body.description,
            breed: req.body.breed,
            picture1: req.body.picture1, // Fixed picture1 property
            picture2: req.body.picture2,
            location: req.body.location,
            interests: req.body.interests,
            socialMedia: req.body.socialMedia,
        });

        res.status(200).json(petData); // Sending response back to client
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to get a pet profile by ID
router.get('/profile/:id', withAuth, async (req, res) => {
    try {
        const profileData = await Pet.findOne({
            where: {
                id: req.params.id, // Changed req.body.id to req.params.id
            },
        });

        if (!profileData) {
            res.status(404).json({ message: 'Profile not found!' });
            return;
        }

        res.status(200).json(profileData); // Sending response back to client
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
