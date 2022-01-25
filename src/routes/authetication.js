const express = require('express');
const router = express.Router();
const passport = require('passport');

const {isLoggedIn,isNotLoggedIn} = require('../lib/auth');

    router.get('/signup',(req, res)=> {
        res.render('auth/signup');
    });

    router.post('/signup',passport.authenticate('local.signup', {
            successRedirect: '/loginmensaje',
            failureRedirect: '/signup',
            failureFlash: true
    }))  
    
    router.get('/profile', isLoggedIn, (req, res) => {
        res.render('profile')
    });

    router.get('/logout', isLoggedIn, (req, res) => {
        req.logOut();
        res.redirect('login');
    });


    router.get('/login',isNotLoggedIn, (req, res)=> {
        res.render('auth/login');
    });

    router.post('/login',isNotLoggedIn, (req, res, next)=> {
        passport.authenticate('local.login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true
        })(req, res, next);
    }); 

    router.get('/loginmensaje', isLoggedIn, (req, res) => {
        res.send('Registro con exito')
    });



module.exports = router;