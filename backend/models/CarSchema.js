const mongoose = require('mongoose')

const carSchema = new mongoose.Schema ({
    dealerName: {type: String, required: true},
    dealerPinCode: {type: String, required: true},
    carModel: {type: String, required: true},
    carColor: {type: String, required: true},
    carRegNum: {type: String, required: true},
});

const CarSchema = mongoose.model('cars', carSchema);

module.exports   = CarSchema
