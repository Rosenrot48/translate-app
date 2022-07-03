const {Router} = require('express');
const router = Router();

router.get('/:word', async (req, res) => {
    const word = req.params.word;
    const answer = word.split("").reverse().join("");
    res.send({answer: answer});
});

module.exports = router;
