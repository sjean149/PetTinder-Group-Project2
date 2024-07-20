const router = require('express').Router();
const { Pet } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to create a pet profile
router.post('/createProfile', withAuth, async (req, res) => {
    try {
        let petData = await Pet.create({
            user_id: req.session.user_id,
            name: req.body.name,
            profilePicture: req.body.profilePicture,
            age: req.body.age,
            description: req.body.description,
            breed: req.body.breed,
            picture1: req.body.picture1,
            picture2: req.body.picture2,
            location: req.body.location,
            interests: req.body.interests,
            socialMedia: req.body.socialMedia
        });

        petData = petData.toJSON();
        console.log(`/profile/${petData.id}`);
        res.redirect(`/profile/${petData.id}`);
    } catch (err) {
        console.log(err);
        res.status(400).json(err);
    }
});



module.exports = router;
