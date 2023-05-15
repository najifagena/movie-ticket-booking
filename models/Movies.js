const mongoose = require('mongoose');
const MovieSchema = new mongoose.Schema({
    title:{
        type : String,
        required: true
    },
    description:{
        type : String,
        required: true
    },
    actors:[{
        type: String,
        required: true
    }],
    releaseDate:{
        type : Date,
        required: true
    },
    posterUrl:{
        type : String,
        required: true
    },
    featured:{
        type : Boolean
    },
    bookings:[{
        type : String,
    }],
    admin:{
        type:String,
        required:true
    }
    

})

const Movie= mongoose.model('movie',MovieSchema);
module.exports = Movie; 