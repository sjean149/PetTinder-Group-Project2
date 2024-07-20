const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a pet profile
router.post('/createProfile', withAuth, async (req, res) => {
    try {
        const petData = await Pet.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(petData); // Sending response back to client
    } catch (err) {
        console.log('Error creating pet profile:', err);
        res.status(400).json(err); // Consider using 500 for server errors
    }
});

// Route to get a pet profile by ID
router.get('/profile/:id', withAuth, async (req, res) => {
    try {
        const profileData = await Pet.findOne({
            where: {
                id: req.params.id,
            },
        });

        if (!profileData) {
            res.status(404).json({ message: 'Profile not found!' });
            return;
        }
        
        res.status(200).json(profileData); // Sending response back to client
    } catch (err) {
        console.log('Error retrieving pet profile:', err);
        res.status(400).json(err); // Consider using 500 for server errors
    }
});

module.exports = router;
