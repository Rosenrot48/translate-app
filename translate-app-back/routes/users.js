const {Router} = require('express');
const express = require('express');
const objectId = require('mongodb').ObjectID;
const router = Router();
const jsonParser = express.json();
const User = require('../models/userModel');
const passport = require('passport');

const isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
};

// запрос всех пользователей
router.get("/", isAuthenticated, async (req,res) => {
    const users = await User.find();
    res.send(users);
});

// запрос конкретного пользователя
router.get("/:id", async (req,res) => {
    const id = new objectId(req.params.id);
    await User.findOne({_id: id}, (err, user) => {
        if (err) return console.log(err);
        res.send(user);
    })
});

// удаление пользователя по id
router.delete("/:id", async (req, res) =>{

    const id = new objectId(req.params.id);
    await User.findOneAndDelete({_id: id}, function(err, result){

        if(err) return console.log(err);
        let user = result.value;
        res.send(user);
    });
});

//обновление данных у пользователя
router.put("/user", jsonParser, async (req, res) =>{

    if(!req.body) return res.sendStatus(400);
    const id = new objectId(req.body.id);
    const userName = req.body.name;
    const userAge = req.body.age;

    await User.findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName}},
        {returnOriginal: false },function(err, result){

            if(err) return console.log(err);
            const user = result.value;
            res.send(user);
        });
});
module.exports = router;
