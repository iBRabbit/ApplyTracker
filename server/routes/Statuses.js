const express = require('express');
const router = express.Router();

const { Applications, Statuses } = require('../models');

const { validateToken } = require('../middlewares/AuthMiddleware');

const jwt = require('jsonwebtoken');

router.post('/:appId',  async (req, res) => {
    const { appId } = req.params;

    const data = await Statuses.findAll({ where: { application_id: appId } });
    res.json(data);
});

module.exports = router;