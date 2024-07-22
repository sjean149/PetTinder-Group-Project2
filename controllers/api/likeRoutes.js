const router = require('express').Router();
const { UserLike } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to save a like
router.post('/chatLikes', withAuth, async (req, res) => {
    try {
        // Create a new like record
        const newLike = await UserLike.create({
            ...req.body,
            user_id: req.session.user_id,
            pet_id: req.session.pet_id
        });

        res.status(200).json(newLike);
    } catch (err) {
        console.error('Error saving like:', err);
        res.status(500).json(err);
    }
});

module.exports = router;
