const express = require('express');
const router = express.Router();
const passport = require('passport');

const usercontroller = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication, usercontroller.profile);
router.post('/update/:id',passport.checkAuthentication, usercontroller.update);

router.get('/sign_in', usercontroller.sign_in);

router.get('/sign_up',usercontroller.sign_up);

router.post('/create',usercontroller.create);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/users/sign_in'},
),usercontroller.createSession);

router.get('/sign_out',usercontroller.destroySession);

module.exports = router;