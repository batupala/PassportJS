const { validationResult } = require('express-validator');
const User = require('../model/user_model');
const passport = require('passport');
require('../config/passport_local')(passport);

const loginFormunuGoster = (req, res, next) => {
    res.render('login', { layout: './layout/auth_layout.ejs' });
}

const login = (req, res, next) => {

    const hatalar = validationResult(req);

    req.flash('validation_error', hatalar.array());
    req.flash('email', req.body.email);
    if (!hatalar.isEmpty()) {

        req.flash('password', req.body.password);

        res.redirect('/login');

    } else {
        passport.authenticate('local', {
            successRedirect: '/yonetim',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next);
    }

}

const registerFormunuGoster = (req, res, next) => {
    res.render('register', { layout: './layout/auth_layout.ejs' });
}

const register = async (req, res, next) => {

    const hatalar = validationResult(req);

    if (!hatalar.isEmpty()) {

        req.flash('validation_error', hatalar.array());
        req.flash('email', req.body.email);
        req.flash('firstname', req.body.firstname);
        req.flash('lastname', req.body.lastname);
        req.flash('password', req.body.password);
        req.flash('repassword', req.body.repassword);
        res.redirect('/register');

    } else {

        try {
            const _user = await User.findOne({ email: req.body.email });
            if (_user) {
                req.flash('validation_error', [{ msg: "Bu mail kullanımda" }]);
                req.flash('email', req.body.email);
                req.flash('firstname', req.body.firstname);
                req.flash('lastname', req.body.lastname);
                req.flash('password', req.body.password);
                req.flash('repassword', req.body.repassword);
                res.redirect('/register');
            } else {
                const newUser = new User({
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: req.body.password,
                });
                await newUser.save();
                console.log("kullanıcı kaydedildi");

                req.flash('success_message', [{ msg: 'Giriş yapabilirsiniz' }]);
                res.redirect('/login');
            }
        } catch (err) {

        }


    }
}

const forgetPasswordFormunuGoster = (req, res, next) => {
    res.render('forget_password', { layout: './layout/auth_layout.ejs' });
}

const forgetPassword = (req, res, next) => {
    console.log(req.body);
    res.render('forget_password', { layout: './layout/auth_layout.ejs' });
}

const logout = (req, res, next) => {
    req.logout();
    req.session.destroy((error) => {

        //req.flash('success_message', [{ msg: 'Çıkış başarılı' }]);
        res.clearCookie('connect.sid');
        res.render('login', { layout: './layout/auth_layout.ejs', success_message: [{ msg: 'Çıkış başarılı' }] })
        // res.redirect('/login');
        //res.send('çıkış yapıldı');
    });
}

module.exports = {
    loginFormunuGoster,
    registerFormunuGoster,
    forgetPasswordFormunuGoster,
    register,
    login,
    forgetPassword,
    logout
}