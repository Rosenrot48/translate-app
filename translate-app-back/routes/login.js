const {Router} = require('express');
const router = Router();
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/register', async (req,res) => {
   try {
       const {email, password, name, surname, telephone, Date} = req.body;

       const candidate = await User.findOne({ email });
       if (candidate) {
           return res.status(400).json({message: 'Такой пользователь уже существует'});
       }
       const hashedPassword = await bcrypt.hash(password, 12);
       const user = new User({email, name, surname, telephone, Date, password: hashedPassword});
       console.log(user);
       user.save();
       const token = jwt.sign(
           {userId: user.id},
           process.env.JWT_TOKEN,
           {expiresIn: '1h'}
       );
       res.status(201).json({message: 'Пользователь создан', token, userID: user.id});
   } catch (e) {
       console.log(e);
       res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
   }
});
router.post('/login', async(req, res) => {
    try {
        const {email, password} = req.body;

        const user  = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({message: 'Пользователь не найден'});
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(400).json({message: 'Неверный пароль'});
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_TOKEN,
            {expiresIn: '1h'}
        );
        res.json({token, userID: user.id})

    } catch (e) {
        res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
});

router.post('/session-validation', async (req,res) => {
    return  res.status(200).json(true);
})

module.exports = router;
