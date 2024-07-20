const router = require('express').Router();
const { User, Pet } = require('../models');
const withAuth = require('../utils/auth');

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
    // Fetch all pets with associated user data
    const petData = await Pet.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    // Log pet data for debugging
    console.log('Pet Data:', petData);

    // Check if no pets are found
    if (petData.length === 0) {
      res.status(404).json({ message: 'No pets found!' });
      return;
    }

    // Serialize the pet data
    const pets = petData.map((pet) => pet.get({ plain: true }));

    // Render the profile page with pet data
    res.render('profile', { 
      pets,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    // Log error and send response
    console.log('Error retrieving pet profiles:', err);
    res.status(500).json(err);
  }
});


// Renders the dashboard page with session logged_in status
router.get('/dashboard', withAuth, async (req, res) => {
  try {
    res.render('dashboard', { logged_in: req.session.logged_in });
  } catch (err) {
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
