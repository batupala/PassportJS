const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/user_model');


module.exports = function (passport) {
    const options = {
        usernameField: 'email',
        passwordField: 'password'
    }
    passport.use(new LocalStrategy(options, async (email, password, done) => {
        try {
            const _bulunanUser = await User.findOne({ email: email });
            if (!_bulunanUser) {
                return done(null, false, { message: 'User bulunamadı' });
            }

            if (_bulunanUser.password !== password) {
                return done(null, false, { message: 'Şifre hatalı' });
            } else {
                return done(null, _bulunanUser);
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error);
            });
        // User.findById(id, function (err, user) {
        //     done(err, user);
        // });
    });




}