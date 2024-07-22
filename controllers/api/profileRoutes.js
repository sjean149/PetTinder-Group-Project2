const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');


router.post('/createProfile', withAuth, async (req, res) => {
    try {
        const petData = await Pet.create({
            ...req.body,
            user_id: req.session.user_id, 
        });
        
        res.status(200).json(petData);
    } catch (err) {
        console.log('Error creating pet profile:', err);
        res.status(400).json(err);
    }
});

router.delete('/profile/:id', withAuth, async (req, res) => {
    try {
        const deletedPetCount = await Pet.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id, 
            },
        });

        if (deletedPetCount === 0) {
            return res.status(404).json({ message: 'No pet found with this id or you do not have permission to delete it' });
        }

        res.status(200).json({ message: 'Pet deleted successfully' });
    } catch (err) {
        console.log('Error deleting pet profile:', err);
        res.status(500).json({ message: 'An error occurred while deleting the pet' });
    }
});

module.exports = router;
