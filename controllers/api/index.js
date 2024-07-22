const router = require('express').Router();
const userRoutes = require('./userRoutes');
const profileRoutes = require('./profileRoutes');
const likeRoutes = require('./likeRoutes')

router.use('/pets', profileRoutes);
router.use('/users', userRoutes);
router.use('/likes', likeRoutes);


module.exports = router;
