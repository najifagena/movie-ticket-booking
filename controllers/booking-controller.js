const mongoose = require('mongoose');
const Movie = require('../models/Movies.js');
const User =require('../models/User.js');
const booking = require('../models/Bookings.js');

const Booking= async(req, res, next) =>{
    const {movie, date , seatNumber , user }= req.body;
    let existingMovie;
    let existingUser;
    try{
        
        existingMovie = await Movie.findById(movie);
        existingUser = await User.findById(user.id);
        console.log(existingMovie, existingUser);
    }
    catch(err){
        return console.log(err);
    }
    if(!existingMovie){
        return res.status(404).json({message:"Movie not found by given id"});
    }
    if(!existingUser){
        return res.status(404).json({message:"User not found by given id"});
    }
    let newBooking;
    try{
        newBooking = new booking({
            movie,
            date:new Date (`${data}`),
            seatNumber,
            user
        });
        const session =await mongoose.startSession();
        session.startTransaction();
        existingMovie.booking.push(newBooking);
        existingUser.booking.push(newBooking);
        await existingMovie.save({session});
        await existingUser.save({session});
        await newBooking.save({session});

        session.commitTransaction();

        //newBooking =await newBooking.save();
    }
    catch(e)
    {
        res.send(e.message);
    }
    if(!newBooking)
    {
        res.status(400).json({
            message:"something Went Wrong"
        })
    }
    res.status(400).json({
        message:"Booking done"
    })


}
const deleteBooking =async (req, res, next) => {
     return console.log('hy')
}
module.exports = {Booking , deleteBooking}