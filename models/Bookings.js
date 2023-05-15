const mongoose = require('mongoose')
const bookingSchema = new mongoose.Schema({
    movie:{
        type:"String",
        require:true
    },
    date:{
        type:"Date",
        require:true
    },
    seatNumber:{
        type:Number,
        require:true
    },
    user:{
        type:"String",
        require:true
    }

})
const booking= mongoose.model('booking',bookingSchema);
module.exports = booking; 