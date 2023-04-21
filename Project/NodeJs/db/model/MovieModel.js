mongoose = require('mongoose')

movieSchema = mongoose.Schema({
    name : {type : String},
    description : {type : String },
    genres : {type : String  , enum : ["Action" , "Comedy" , "Adventure" , "Fantasy" , "Horror" ,"Drama" , "Thriller" , "Romance" , "Mystery"]},
    releaseTime : {type : Date},
    runTime : {type : Number },
    startTime : {type : Date },
    endTime : {type : Date },
    image : {type : String} ,
    cover : {type : String} ,
    screen : {type : Number},
    seats : [],
    crew : [{type : String}],
    trailer : { type : String},
    price : {type : Number}
})


movieModel = mongoose.model("movie" , movieSchema)

module.exports = movieModel