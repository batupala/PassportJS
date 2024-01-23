const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
//session işlemleri için gerekli paket
const session = require('express-session');
//render edilen sayfalarda mesaj göstermek için kullanılan ve de çalışmak için session paketi isteyen yardımcı paket
const flash = require('connect-flash');
const passport = require('passport');

//template engine ayarları
const ejs = require('ejs');
const expressLayouts = require('express-ejs-layouts');
const path = require('path');
app.use(expressLayouts);
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', path.resolve(__dirname, './src/views'));

//db bağlantısı
require('./src/config/database');
const MongoDBStore = require('connect-mongodb-session')(session);

const sessionStore = new MongoDBStore({
    url: process.env.MONGODB_CONNECTION_STRING,
    databaseName: 'Proje',
    collection: 'sessionlar'
});

//session ve flash message

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    store: sessionStore
}));

//flash mesajların middileware olarak kullanılmasını sağladık
app.use(flash());

app.use((req, res, next) => {
    res.locals.validation_error = req.flash('validation_error');
    res.locals.success_message = req.flash('success_message');
    res.locals.email = req.flash('email');
    res.locals.firstname = req.flash('firstname');
    res.locals.lastname = req.flash('lastname');
    res.locals.password = req.flash('password');
    res.locals.repassword = req.flash('repassword');

    res.locals.login_error = req.flash('error')


    next();
})

app.use(passport.initialize());
app.use(passport.session());


//routerlar include edilir
const authRouter = require('./src/routers/auth_router');
const yonetimRouter = require('./src/routers/yonetim_router');

//formdan gelen değerlerin okunabilmesi için
app.use(express.urlencoded({ extended: true }));





let sayac = 0;


app.get('/', (req, res) => {
    if (req.session.sayac) {
        req.session.sayac++;
    } else {
        req.session.sayac = 1;
    }
    res.json({ mesaj: 'sa', sayacim: req.session.sayac });
});

app.use('/', authRouter);
app.use('/yonetim', yonetimRouter);

app.listen(process.env.PORT, () => {
    console.log(`Serverı ${process.env.PORT} portundan sikiyorum`);
});