const router = require('express').Router();
const { User, Pet, UserLike } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('startPage', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/dashboard');
    return;
  }
  try {
    res.render('login', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    console.log('Pet Data:', petData);

    if (petData.length === 0) {
      res.status(404).json({ message: 'No pets found!' });
      return;
    }

    const pets = petData.map((pet) => pet.get({ plain: true }));

    res.render('profile', { 
      pets,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log('Error retrieving pet profiles:', err);
    res.status(500).json(err);
  }
});


router.get('/profile/:id', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findByPk(req.params.id);

    if (!petData) {
      res.status(404).json({ message: 'No pet found with this id!' });
      return;
    }

    const pet = petData.toJSON();
    console.log(pet);

    res.render('profile', { pet, logged_in: req.session.logged_in });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    if (petData.length === 0) {
      res.status(404).json({ message: 'No pets found!' });
      return;
    }

    const pets = petData.map((pet) => pet.get({ plain: true }));

    res.render('dashboard', { 
      pets,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log('Error retrieving pet profiles:', err);
    res.status(500).json(err);
  }
});


router.get('/createProfile', withAuth, async (req, res) => {
  try {
    console.log(req.session);
    res.render('createProfile', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/chatsLikes', async (req, res) => {
  try {
    const likeData = await UserLike.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Pet,
          attributes: ['name', 'profile_picture'],
        },
      ],
    });

    console.log('Like Data:', JSON.stringify(likeData, null, 2));

    if (likeData.length === 0) {
      res.status(404).json({ message: 'No likes found!' });
      return;
    }

    const likes = likeData.map((like) => like.get({ plain: true }));

    res.render('chatsLikes', { 
      likes,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log('Error retrieving likes:', err);
    res.status(500).json(err);
  }
});


module.exports = router;
