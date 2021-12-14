const express = require("express");
const router = express.Router()
const CarSchema = require('../models/CarSchema')

router.delete('/deleteCar/:id',  (req, res) => {
     CarSchema.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
            res.status(500).json({
                status: 'error',
                message: err
            })
        } else {
            res.status(200).json({
                status: 'success',
                message: "Car deleted successfully"
            })
        }
    })
})
module.exports = router;
