const doctorModel = require('../../models/Doctor.js');
const infoGetter = require('../../config/infoGetter.js');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');


const createDoctor = asyncHandler(async (req, res) => {
    //create a Patient in the database
    //check req body
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({message: 'Request body is empty'});
    }
    const requiredVariables = ['FirstName', 'LastName', 'Username', 'Password', 'Email', 'DateOfBirth', 'affiliation', 'HourlyRate', 'Degree', 'Specialty'];

    for (const variable of requiredVariables) {
        console.log(req.body[variable]);
        if (!req.body[variable]) {
            return res.status(400).json({message: `Missing ${variable} in the request body`});
        }
    }
    // If all required variables are present, proceed with creating an admin
    const {
        FirstName,
        LastName,
        Username,
        Password,
        Email,
        DateOfBirth,
        affiliation,
        HourlyRate,
        Degree,
        Specialty
    } = req.body;
    // Hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    if (await infoGetter.getUsername(req, res) === '' && await infoGetter.getEmail(req, res) === '') {
        const newDoctor = new doctorModel({
                FirstName: FirstName,
                LastName: LastName,
                Username: Username,
                Password: hashedPassword,
                Email: Email,
                DateOfBirth: DateOfBirth,
                HourlyRate: HourlyRate,
                affiliation: affiliation,
                Degree: Degree,
                Specialty: Specialty,
            })
        ;
        await newDoctor.save();
        return res.status(201).json("Doctor created successfully!");

    } else {
        return res.status(400).json({message: "Username already exists"});
    }
});

const getAllDoctors = asyncHandler(async (req, res) => {
    try{
    const doctors = await doctorModel.find({});
    return res.status(200).json(doctors);
    }catch(error){
        return res.status(400).json({message: error.message});
    }
});

const viewDoctorRegister = asyncHandler(async (req, res) => {
    res.render('DoctorViews/RegisterDoctor');
});
module.exports = {createDoctor, viewDoctorRegister,getAllDoctors};