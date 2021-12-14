const express = require("express");
const router = express.Router()
const CarSchema = require('../models/CarSchema')

router.get('/getCar',  (req, res) => {
     CarSchema.find({}, (err,car) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                message: err
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: car
            })
        }
    })
})
module.exports = router;
