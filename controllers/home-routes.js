const router = require('express').Router();
// const { User } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('login');
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('')

module.exports = router;
