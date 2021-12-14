const express = require("express");
const router = express.Router()
const CarSchema = require('../models/CarSchema')

router.post('/addCar', async (req, res) => {

    const {
        dealerName,
        dealerPinCode,
        carModel,
        carColor,
        carRegNum
    } = req.body

    if (!dealerName || !dealerPinCode || !carModel || !carColor || !carRegNum) {
        return res.status(400).json({
            status: "error",
            message: "Please enter all the details"
        })
    }
    await CarSchema.findOne({$or: [{dealerName}, {carRegNum}]})
        .then(async car => {
            if (car) {
                if (dealerName === car.dealerName) {
                    return res.status(400).json({
                        status: "error",
                        message: "Dealer already exists"
                    })
                }
                if (dealerPinCode === car.dealerPinCode) {
                    return res.status(400).json({
                        status: "error",
                        message: "Dealer Pin Code already exists"
                    })
                }
                if (carRegNum === car.carRegNum) {
                    return res.status(400).json({
                        status: "error",
                        message: "Registration Number already exists"
                    })
                }
            } else {
                const car = new CarSchema({
                    dealerName,
                    dealerPinCode,
                    carModel,
                    carColor,
                    carRegNum
                })

                await car.save()
                    .then(() => {
                        res.status(200).json({
                            status: 'success',
                            message: "Car added successfully"
                        })
                    })
                    .catch(err => {
                        res.status(500).json({
                            status: 'error',
                            message: err
                        })
                    })
            }
        })
})
module.exports = router;
