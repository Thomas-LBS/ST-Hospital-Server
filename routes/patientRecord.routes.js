const express = require("express");
const router = express.Router();
const PatientRecord = require('../models/PatientRecord.model')

router.get("/", (req, res, next) => {
    PatientRecord.find()
    .populate('user')
    .populate('record.doctor')
    .populate('record.appointment')
.then(records=>{
    res.json(records)
})
.catch(error=>{
    console.log('error',error)
})
})


router.post("/create", (req, res, next) => {
    const {patientRecord,patientVitals}=req.body
    console.log('patientRecord',req.body)
    PatientRecord.create(patientRecord)
.then(records=>{
    res.json(records)
})
.catch(error=>{
    console.log('error',error)
})
})


module.exports = router
