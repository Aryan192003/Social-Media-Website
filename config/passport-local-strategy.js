const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
    },
    async function(req,email,password,done){

        const user= await User.findOne({email: email});
        if(!user || user.password!=password){
            req.flash('error', 'Invalid Username/Password');
            return done(null, false);
        }
        else{
        return done(null, user);
        }
    }
))

passport.serializeUser(function(user,done){
    done(null, user.id);
})

passport.deserializeUser(async function(id,done){
    const user = await User.findById(id);
    if(user){
         return done(null,user);
    }
    return done(err);

   
});

passport.checkAuthentication = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }

    return res.redirect('/users/sign_in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;