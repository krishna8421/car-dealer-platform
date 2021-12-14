const dotenv = require('dotenv');
const mongoose = require('mongoose')
dotenv.config();


const dbConnect = async () =>{
    mongoose.connect(process.env.MONGO_URI,{useNewUrlParser: true,useUnifiedTopology: true});
    const db = await mongoose.connection
    db.on('error', (error)=> console.error(error))
    db.once( 'open',() => console.log("MongoDB Connected"))

}

module.exports = dbConnect;
