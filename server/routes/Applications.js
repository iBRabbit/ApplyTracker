const express = require('express');
const router = express.Router();

const { Applications } = require('../models');
const { validateToken } = require('../middlewares/AuthMiddleware');

router.get('/', validateToken, async (req, res) => {
    const data = await Applications.findAll();
    res.json(data);
});

router.post('/ByUid/',  async (req, res) => {
    const { id } = req.params;
    const data = await Applications.findAll({ where: { UserId: id } });
    res.json(data);
});

module.exports = router;