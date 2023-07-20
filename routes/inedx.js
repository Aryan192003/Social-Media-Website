const express = require('express');

const router = express.Router();
const homecont = require('../controllers/home_controller');

console.log('everything is fine');

router.get('/', homecont.home);
router.use('/users', require('./users') );
router.use('/post', require('./post'));


module.exports = router;