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
        
        application.dataValues.status_name = "No Status";

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
    
    for(let i = 0; i < data.length; i++) {
        const statuses = await Statuses.findAll({
            where: {
                id: data[i].dataValues.status
            }
        });
        
        try {
            data[i].dataValues.status_name = statuses[0].dataValues.status;
        } catch (error) {
            if(data[i].dataValues.status)
                data[i].dataValues.status_name = "Apply";
            else if (!data[i].dataValues.status)
                data[i].dataValues.status_name = "Rejected";
            else data[i].dataValues.status_name = "No Status";
        } 
    }

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

    for(let i = 0; i < apps.length; i++) {
        const statuses = await Statuses.findAll({
            where: {
                id: apps[i].dataValues.status
            }
        });

        try {
            apps[i].dataValues.status_name = statuses[0].dataValues.status;
        } catch (error) {
            if(apps[i].dataValues.status)
                apps[i].dataValues.status_name = "Apply";
            else if (!apps[i].dataValues.status)
                apps[i].dataValues.status_name = "Rejected";
            else apps[i].dataValues.status_name = "No Status";
        }
    }

    res.json(apps);
});

router.put('/status/:id', validateToken, async (req, res) => {
    const appID = req.params.id;

    const {
        statuses
    } = req.body;

    await Statuses.destroy({
        where: {
            application_id: appID
        }
    });

    statuses.forEach(async element => {
        const statusData = {
            "application_id": appID,
            "status": element
        };
        await Statuses.create(statusData);
    });


    return res.json({
        message: "Edit Application"
    });
});



module.exports = router;