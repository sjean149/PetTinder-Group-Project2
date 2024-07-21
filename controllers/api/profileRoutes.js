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
router.delete('/profile/:id', withAuth, async (req, res) => {
    try {
        // Attempt to delete the pet record
        const deletedPetCount = await Pet.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        // Check if any record was deleted
        if (deletedPetCount === 0) {
            return res.status(404).json({ message: 'No pet found with this id or you do not have permission to delete it' });
        }

        // Respond with a success message
        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        // Log the error and respond with a server error status
        res.status(500).json({ message: 'An error occurred while deleting the pet' });
    }
});

module.exports = router;
