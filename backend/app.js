const dotenv = require('dotenv');
const express = require('express');
const cors = require("cors");
const mongoConnect = require('./mongoConnect')
const bodyParser = require ('body-parser')
const addCar = require('./router/addCar')
const getCars = require('./router/getCar')
const deleteCar = require('./router/deleteCar')

const corsOptions = {
    origin: "http://localhost:3000",
};

dotenv.config();
const app = express()
const port = process.env.PORT || 8080
mongoConnect().then()

app.use(bodyParser.json());
app.use(cors(corsOptions));
app.use('/',cors(corsOptions), addCar)
app.use('/',cors(corsOptions), getCars)
app.use('/',cors(corsOptions), deleteCar)


app.listen(port, () => {
    console.log(`Api started at Port:${port}`)
});
