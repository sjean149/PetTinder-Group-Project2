const router = require('express').Router();


router.get('/', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/profile', async (req, res) => {
    try {
        res.render('profile');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        res.render('dashboard');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/createProfile', async (req, res) => {
    try {
        res.render('createProfile');
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/chatsLikes', async (req, res) => {
    try {
        res.render('chatsLikes');
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
