const passport = require('passport');
const passportlocal = require('passport-local').Strategy;
const pool = require('../settings/db');
const helpers = require('./helpers');

passport.use('local.login', new passportlocal({
    usernameField: 'name',
    passwordField: 'password',
    passReqToCallback: true
 }, async (req, name, password, done) => {
    const rows  = await pool.query('SELECT * FROM user WHERE name= ?', [name]);
    if (rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword){
            done(null, user, req.flash('success','Bienvenido'+ user.name));
        } else {
            done(null, false, req.flash('message','Password Incorrecto'));
        }
    } else {
        return done(null, false, req.flash('message', 'Usuario no existe'));
    }
    
 })); 


passport.use('local.signup', new passportlocal({
   usernameField: 'name',
   passwordField: 'password',
   passReqToCallback: true
}, async (req, name, password, done) => {
    console.log(req.body);
        const newUser = {
            name,
            password
        };
        
      newUser.password = await helpers.encryptPassword(password);

        const resultado = await pool.query('INSERT INTO user SET ?', [newUser]);
        //console.log(resultado);
        newUser.id_user = resultado.insertId;
        return done(null, newUser);
})); 

passport.serializeUser((user, done) =>{
    done(null, user.id_user);
    //console.log(user);
});

passport.deserializeUser(async (id_user, done) =>{
    const rows  = await pool.query('SELECT * FROM user WHERE id_user= ?', [id_user]);
    done(null, rows[0]);
});

