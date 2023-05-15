const express= require('express');
const dotenv=require('dotenv');
const app = express();
const mongoose=require('mongoose');
dotenv.config();
const userRouter = require('./routes/user-routes.js');
const adminRouter = require('./routes/admin-routes.js');
const movieRouter = require('./routes/movie-routes.js');
const bookingRouter = require('./routes/booking-routes.js');

const cors=require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET','POST', 'PUT', 'DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})
app.use(express.json());
//middelware
app.use("/user",userRouter);
app.use("/admin",adminRouter);
app.use('/movie', movieRouter);
app.use('/booking', bookingRouter); 

mongoose.connect(`mongodb+srv://Jethra_Saaena:${process.env.MONGODB_PASSWORD}@movie-system.z9iiswb.mongodb.net/Movies?retryWrites=true&w=majority`)
app.listen(5000,()=>{
    console.log(`Connected to local host port ${5000}`)
}) 
//U76TVkXAyNvHhds0