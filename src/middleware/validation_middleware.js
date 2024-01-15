const { body } = require('express-validator');

const validateNewUser = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir mail gir'),
        body('password').trim()
            .isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({ max: 20 }).withMessage('Şifre en fazla 20 karakter olmalı'),
        body('firstname').trim()
            .isLength({ min: 3 }).withMessage('İsim en az 3 karakter olmalı')
            .isLength({ max: 30 }).withMessage('İsim en fazla 30 karakter olmalı'),
        body('lastname').trim()
            .isLength({ min: 3 }).withMessage('Soyisim en az 3 karakter olmalı')
            .isLength({ max: 30 }).withMessage('Soyisim en fazla 30 karakter olmalı'),
        body('repassword').trim().custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Şifreler aynı değil')
            }
            return true;
        })
    ];
}

const validateLogin = () => {
    return [
        body('email')
            .trim()
            .isEmail().withMessage('Geçerli bir mail gir'),
        body('password').trim()
            .isLength({ min: 6 }).withMessage('Şifre en az 6 karakter olmalı')
            .isLength({ max: 20 }).withMessage('Şifre en fazla 20 karakter olmalı'),
    ];
}

module.exports = {
    validateNewUser,
    validateLogin
}