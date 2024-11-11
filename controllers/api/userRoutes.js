//REQUIRES

const router = require('express').Router();
const { User } = require('../../models');


//POST ALL

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


//POST LOGIN

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: { username : req.body.username },
        });
        if (!userData) {
            res.status(400).json({ message: 'Your info is wrong, try again' });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);
        if (!validPassword) {
            res.status(400).json({ message: 'Your info is wrong, try again' });
            return;
        }
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.username = userData.username;
            req.session.logged_in = true;
            res.status(200).json({
                userData,
                message: 'You managed to log yourself in, congrats!',
            });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});


//POST LOGOUT

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});


module.exports = router;