const router = require('express').Router();
const { User } = require('../models');
const { Pet } = require('../models');
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

// Renders the profile page with session logged_in status
router.get('/profile', withAuth, async (req, res) => {
  try {
    res.render('profile', { logged_in: req.session.logged_in });
  } catch (err) {
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
