const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { updateDoctor } = require('./Doctors/UpdateController');
const { addFamilyMember , viewFamilyMembers } = require('./Patient/FamilyMembersController');

function verifyToken(req, res, next) {
    const token = req.headers['token'];
    try{
        const model = jwt.verify(token, process.env.SECRET_KEY);
        res.locals.token = model;
        next();
    }
    catch(e){
        res.status(401).json({message: e.message});
    }
}

app.use(verifyToken);

router.put('/doctors', updateDoctor);
router.post('/patients/family-members', addFamilyMember);
router.get('/patients/family-members', viewFamilyMembers);

