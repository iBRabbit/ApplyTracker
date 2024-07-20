const express = require('express');
const router = express.Router();

const { Applications } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

const jwt = require('jsonwebtoken');

router.get('/', validateToken, async (req, res) => {
    const data = await Applications.findAll();
    res.json(data);
});

router.post('/ByUid/', async (req, res) => {
    const token = req.headers["authorization"].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const data = await Applications.findAll({
        where: {
            user_id: decoded.id
        }
    });

    res.json(data);

});

module.exports = router;