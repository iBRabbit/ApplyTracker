const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Users } = require('../models');

router.get('/', async (req, res) => {
    const data = await Users.findAll();
    res.json(data);
});

router.post('/', async (req, res) => {
    const { username, password, email } = req.body;

    const isUsernameExists = await Users.findOne({ where: { username } });
    if (isUsernameExists) {
        return res.status(400).json({
            message: "Username already exists",
            success: false
        });
    }

    const isEmailExists = await Users.findOne({ where: { email } });
    if (isEmailExists) {
        return res.status(400).json({
            message: "Email already exists",
            success: false
        });
    }

    if (password.length < 6 || password.length > 20) {
        return res.status(400).json({
            message: "Password must be between 6 to 20 characters",
            success: false
        });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);

    await Users.create({
        username,
        password: hashPassword,
        email
    });

    res.json({
        message: "Anda berhasil mendaftarkan akun anda.",
        success: true
    });
});

router.post('/login', async (req, res) => {
    const {username, password} = req.body;

    try {
        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(400).json({
                message: "Username not found"
            });
        }

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password",
            });
        }

        const payload = {
            id: user.id,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        });
        
        res.json({
            success: true,
            token: token,
            message: 'Anda berhasil login'
        });

    } catch (error) {
        res.status(500).json({msg : error.message});
    }
});

router.get('/check', async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findByPk(decoded.id);

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        res.json({
            success: true,
            message: 'User is authenticated',
            status: 200
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
