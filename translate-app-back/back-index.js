const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const objectId = require('mongodb').ObjectID;
const cors = require('cors');
require('dotenv/config');




const app = express();
const jsonParser = express.json();

const PORT = process.env.PORT || 3000;


const mongoClient = new MongoClient(process.env.DB_CONNECTION, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

let dbClient;
app.use(cors());

// app.use()

mongoClient.connect((err, client) => {
    if (err) return console.log(err);
    dbClient = client;
    app.locals.collection = client.db("usersdb").collection("users");
    app.listen(3000, () => {
        console.log('Сервер ожидает подключения...');
    })
});

// запрос всех пользователей
app.get("/api/users", (req,res) => {
    const collection = req.app.locals.collection;
    collection.find({}).toArray((err, users) => {
        if (err) return console.log(err);
        res.send(users);
    })
});

// запрос конкретного пользователя
app.get("/api/users/:id", (req,res) => {
    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOne({_id: id}, (err, user) => {
        if (err) return console.log(err);
        res.send(user);
    })
});

// создание нового пользователя
app.post("/api/users", jsonParser, function (req, res) {

    if(!req.body) return res.sendStatus(400);

    const userName = req.body.name;
    const userAge = req.body.age;
    const user = {name: userName, age: userAge};
    console.log(user);

    const collection = req.app.locals.collection;
    collection.insertOne(user, function(err, result){

        if(err) return console.log(err);
        res.send(user);
    });
});

// удаление пользователя по id
app.delete("/api/users/:id", function(req, res){

    const id = new objectId(req.params.id);
    const collection = req.app.locals.collection;
    collection.findOneAndDelete({_id: id}, function(err, result){

        if(err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
});

//обновление данных у пользователя
app.put("/api/users", jsonParser, function(req, res){

    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;

    const collection = req.app.locals.collection;
    collection.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
        {returnOriginal: false },function(err, result){

            if(err) return console.log(err);
            const user = result.value;
            res.send(user);
        });
});

// прослушиваем прерывание работы программы (ctrl-c)
process.on("SIGINT", () => {
    dbClient.close();
    process.exit();
});




// const express = require('express');
// // const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv/config');
// const MongoClient = require('mongodb').MongoClient;
// const objectId = require('mongodb').ObjectID;
//
// const jsonParser = express.json();
// const mongoClient = new MongoClient(process.env.DB_CONNECTION, {
//     useNewUrlParser: true,
//     useFindAndModify: false,
//     useUnifiedTopology: true
// });
//
//
// const app = express();
//
//
//
// async function start() {
//     try {
//         await mongoClient.connect((err, db) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log('connected');
//             }
//             // db.close();
//             });
//         app.listen(PORT, () => {
//             console.log('server has been started');
//             updateUserInfo({age: 54, name: "Tom"}, {age: 55});
//             // createUser({name: "Brad", age: 18});
//             // createUser({name: "Tim", age: 54});
//             // createUser({name: "Katy", age: 13});
//             // createUser({name: "Leo", age: 21});
//             // createUser({name: "Tom", age: 54});
//             // createUser({name: "Hillary", age: 65});
//
//             // findUser({name: "Hillary"});
//             // deleteUser({name: "Hillary"})
//         });
//     } catch (e) {
//         console.log(e);
//     }
// }
//
// start();
//
// function createUser(user) {
//     if (user) {
//         mongoClient.connect((err, client) => {
//             const db = client.db("usersdb");
//             const collection = db.collection("users");
//             // const user = {name: "Nick", age: 23};
//             collection.insertOne(user, (err, result) => {
//                 if (err) {
//                     return console.log(err);
//                 }
//                 console.log(result.ops);
//                 client.close();
//             })
//         })
//     }
// }
// function findUser(user) {
//     if (user) {
//         mongoClient.connect((err, client) => {
//             // const collection = client.db("userdb").collection("users");
//             const db = client.db("usersdb");
//             const collection = db.collection("users");
//             collection.find(user).toArray((err, results) => {
//                 if (err) return  console.log(err);
//                 console.log(results);
//                 client.close();
//             });
//         })
//     }
// }
//
// function deleteUser(user) {
//     if (user) {
//         mongoClient.connect((err, client) => {
//             const db = client.db("usersdb");
//             const collection = db.collection("users");
//             collection.deleteMany(user, (err, result) => {
//                 console.log(result);
//                 client.close();
//             })
//         })
//     }
// }
// function updateUserInfo(user, userUpdateInfo) {
//     if (user) {
//         mongoClient.connect((err, client) => {
//             const db = client.db("usersdb");
//             const collection = db.collection("users");
//             collection.findOneAndUpdate(
//                 user, // критерий выборки
//                 {$set: userUpdateInfo}, // параметр обновления
//                 {
//                     returnOriginal: false // опции для обновления ( если мы хотим при обновлении получать не старое, а новое, изменненое состояние документа
//                 },
//                 (err, result) => {
//                     console.log(result);
//                     client.close();
//                 });
//         })
//     }
// }
