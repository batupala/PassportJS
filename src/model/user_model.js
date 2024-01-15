const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Ad alanı boş olamaz"],
        trim: true,
        minlength: 3,
        maxlength: 30
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: [30, "Soyadı max 30 karakter olmalı"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
}, { collection: 'kullanicilar', timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User;