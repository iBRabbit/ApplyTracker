const express = require('express');
const router = express.Router();

const { Applications, Statuses } = require('../models');

const { validateToken } = require('../middlewares/AuthMiddleware');

const jwt = require('jsonwebtoken');

router.get('/', validateToken, async (req, res) => {
    const data = await Applications.findAll();
    res.json(data);
});

router.post('/', validateToken, async (req, res) => {
    const {
        company_name,
        position,
        status,
        date_applied,
        notes
    } = req.body;
    
    const token = req.headers["token"]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = decoded.id;

    if (!company_name) 
        return res.status(400).json({ message: "Company name is required" });

    if (!position) 
        return res.status(400).json({ message: "Position is required" });

    if (!status)
        return res.status(400).json({ message: "Status is required" });
    
    if(notes.length > 255)
        return res.status(400).json({ message: "Notes must be less than 255 characters" });

    const data = {
        "user_id": user_id,
        "company": company_name,
        "position": position,
        "status": status,
        "notes": notes,
        "date_followup": null,
        "date_applied": date_applied
    };

    try {
        const application = await Applications.create(data);

        status.forEach(async element => {
            const statusData = {
                "application_id": application.id,
                "status": element
            };
            await Statuses.create(statusData);
        });

        res.json(application);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

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

router.put('/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    const {
        company_name,
        position,
        status,
        date_applied,
        date_followup,
        notes
    } = req.body;

    if (!company_name) 
        return res.status(400).json({ message: "Company name is required" });

    if (!position) 
        return res.status(400).json({ message: "Position is required" });

    if (!status)
        return res.status(400).json({ message: "Status is required" });

    if(notes.length > 255)
        return res.status(400).json({ message: "Notes must be less than 255 characters" });

    const data = {
        company: company_name,
        position: position,
        status: status,
        notes: notes,
        date_applied: date_applied
    };

    if (date_followup) 
        data.date_followup = date_followup;
    
    await Applications.update(data, {
        where: {
            id: id
        }
    });


    const token = req.headers["token"]
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const apps = await Applications.findAll({
        where: {
            user_id: decoded.id
        }
    });

    res.json(apps);
});

module.exports = router;