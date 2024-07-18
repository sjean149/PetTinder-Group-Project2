const router = require('express').Router();
const { Pet } = require('../../models');
// const withAuth = require('../utils/auth');

// -- api/pets/login
router.post('/createProfile', async (req, res) => {
   
    try {
        const petData = await Pet.create({
            user_id: req.session.user_id,
            name: req.body.name,
            profilePicture: req.body.profilePicture,
            age: req.body.age,
            description: req.body.description,
            breed: req.body.breed,
            picture1: req.body.picture2,
            picture2: req.body.picture2,
            location: req.body.location,
            interests: req.body.interests,

        });
        petData = petData.toJSON();
        console.log(petData);

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/profile/:id', async (req, res) => {
    try {
        const profileData = await Pet.findOne({
            where: {
                id: req.body.id,
            },
        });
        if (profileData) {
            const profileDataJSON = Pet.toJSON();
            console.log(profileDataJSON);
            res.send(profileDataJSON);
        }

        if (!profileData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password. Please try again!' });
            return;
        }

    } catch (err) {
        console.error(`Profile can not be seen because:`, err);
    }

})

module.exports = router;

