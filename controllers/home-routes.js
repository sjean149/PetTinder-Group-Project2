const router = require('express').Router();
const { User } = require('../models');
// const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
        res.render('startPage', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});
 
//WORK HERE
router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
      }
    
      res.render('login', {logged_in: req.session.logged_in});
    });

router.get('/profile', async (req, res) => {
    try {
        res.render('profile', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});

//WORK HERE
router.get('/createProfile', async (req, res) => {
    try {
        res.render('createProfile', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});



router.get('/chatsLikes', async (req, res) => {
    try {
        res.render('chatsLikes', {logged_in: req.session.logged_in});
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;
