const router = require('express').Router();
const { User, Pet } = require('../models');
const withAuth = require('../utils/auth');
const { Op } = require('sequelize');

// Renders the start page with session logged_in status
router.get('/', async (req, res) => {
  try {
    res.render('startPage', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Redirects to dashboard if already logged in; otherwise, renders the login page
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

// Renders the profile page with session logged_in status and includes pet data
router.get('/profile', withAuth, async (req, res) => {
  try {
    const petData = await Pet.findAll({
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

// Renders the dashboard page with session logged_in status and excludes current user's pets
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;
    const petData = await Pet.findAll({
      where: {
        user_Id: {
          [Op.ne]: userId
        }
      }
    });

    console.log('Pet Data:', petData);

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

// Renders the createProfile page with session logged_in status
router.get('/createProfile', withAuth, async (req, res) => {
  try {
    console.log(req.session);
    res.render('createProfile', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Renders the chatsLikes page with session logged_in status
router.get('/chatsLikes', async (req, res) => {
  try {
    res.render('chatsLikes', { logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
