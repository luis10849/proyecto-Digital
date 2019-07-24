const passport = require('passport');
const Stratrgy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.login', new Stratrgy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done) => {
   
    console.log("llego");
    console.log(user);
    const usuarios = await pool.query('SELECT * FROM usuarios WHERE user = ?', [user]);
    console.log(usuarios.length);
    if(usuarios.length>0){
        const usuario= usuarios[0];
        console.log("encontro el usuario");
        console.log(usuario.pass);
        console.log(usuario.user);
        const isValido=await helpers.comparar(pass,usuario.pass);
        
        console.log(isValido);
        if(isValido){
            done(null,usuario,req.flash('success','Bienvenido  '+usuario.user));
        }else{
            done(null,false,req.flash('message','contraseña incorrecta'));
        }
    }else{
        return done(null,false,req.flash('message','el nombre de usuario no existe'));
    }
    
}));
passport.use('local.registro', new Stratrgy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done) => {
    const { nombre } = req.body;
    const newUser = {
        user,
        pass,
        nombre
    };
    newUser.pass = await helpers.encryptar(pass);
    const res = await pool.query('INSERT INTO usuarios SET ?', [newUser]);
    newUser.id = res.insertId;
    return done(null, newUser);
}));
passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
    done(null, rows[0]);
});