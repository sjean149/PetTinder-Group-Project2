const router = require('express').Router();
const { User } = require('../models');
const { Pet } = require('../models');
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
    // Fetch pets associated with the logged-in user
    const petData = await Pet.findAll({
      where: {
        user_id: req.session.user_id, // Use the logged-in user's ID
      },
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

// Route to render the pet profile page
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

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id; // Set the user_id in session
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
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
