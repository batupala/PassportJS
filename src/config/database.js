const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => console.log('veritabanına bağlanıldı'))
    .catch(hata => console.log(`veritabanı bağlantı hatası ${hata}`))