const express = require('express');
const cors = require('cors');
require('dotenv/config');
const userRoutes = require('./routes/users');
const translateRoutes = require('./routes/translate');
const loginRoutes = require('./routes/login');
const passport = require('passport');
const mongoose = require('mongoose');
const app = express();
// MiddleWare
app.use(cors({
    origin: '*'
}));
app.use(express.json({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
    
const PORT = process.env.PORT || 3000;
let dbClient;
app.use('/api/auth', loginRoutes);
app.use('/api/users', userRoutes);
app.use('/api/translate', translateRoutes);

mongoose.Promise = Promise;
// mongoose.set('debug', true);
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true}, (err, connection) => {
    if (err) return console.log(err);
    console.log("Подключение к базе произошло успешно...");
    setTimeout(() => {
        console.log('Сервер ожидает подключения...');
    }, 1000);
});
app.listen(PORT);

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});
