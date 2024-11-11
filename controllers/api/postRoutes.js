//REQUIRES

const router = require('express').Router();
const { Post } = require('../../models/');
const { apiGuard } = require('../../utils/authGuard');


//POST ALL

router.post('/', apiGuard, async (req, res) => {
    const body = req.body;
    try {
        const newPost = await Post.create({ ...body, userId: req.session.user_id });
        res.json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});


//PUT ID

router.put('/:id', apiGuard, async (req, res) => {
    try {
        const [ affectedRows ] = await Post.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});


//DELETE ID

router.delete('/:id', apiGuard, async (req, res) => {
    try {
        const [ affectedRows ] = Post.destroy({
            where: {
                id: req.params.id,
            },
        });
        if (affectedRows > 0) {
            res.status(200).end();
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;