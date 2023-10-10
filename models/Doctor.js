const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    FirstName: {
        type: String,
        required: [true, 'Please enter a first name']
    },
    LastName: {
        type: String,
        required: [true, 'Please enter a last name']
    },
    Username: {
        type: String,
        required: [true, 'Please enter a username'],
        unique: true,
    },
    Password: {
        type: String,
        required: [true, 'Please enter a password']
    },
    Email: {
        type: String,
        required: [true, 'Please enter an email']
    },
    DateOfBirth: {
        type: Date,
        required: [true, 'Please enter a Date of Birth']
    },
    HourlyRate: {
        type: Number,
        required: [true, 'Please enter an hourly rate']
    },
    affiliation: {
        type: String,
        required: [true, 'Please enter an affiliation']
    },
    Degree: {
        type: String,
        required: [true, 'Please enter a degree']

    },
    Specialty: {
        type: String,
        required: false,
    },
    Status: {
        type: String,
        enum: ['Approved', 'Pending', 'Rejected'],
        default: 'Pending',
        required: true,
    }
}, {timestamps: true});

const Doctor = mongoose.model('Doctor', doctorSchema, 'Doctors');
module.exports = Doctor;