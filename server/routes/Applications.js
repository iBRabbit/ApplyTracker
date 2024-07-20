const express = require('express');
const router = express.Router();

const { Applications } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

const jwt = require('jsonwebtoken');

router.get('/', validateToken, async (req, res) => {
    const data = await Applications.findAll();
    res.json(data);
});

router.post('/ByUid/', validateToken, async (req, res) => {
    const token = req.headers["token"]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await Applications.findAll({
        where: {
            user_id: decoded.id
        }
    });

    res.json(data);
});

router.delete('/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    await Applications.destroy({
        where: {
            id: id
        }
    });

    res.json({
        message: `Application with id ${id} has been deleted`
    });
});

module.exports = router;