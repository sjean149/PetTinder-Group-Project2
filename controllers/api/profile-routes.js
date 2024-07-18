const router = require('express').Router();
const { Pet } = require('../../models');
// const withAuth = require('../utils/auth');


router.post('/profile', async (req, res) => {
    try {
        const petData = await Pet.create({
            name: req.body.name,
            profilePic: req.body.profilePic,
            age: req.body.age,
            description: req.body.description,
            breed: req.body.breed,
            location: req.body.location,
            interests: req.body.interests
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

