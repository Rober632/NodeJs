const movieModel = require('../db/model/MovieModel')
const helper = require('../helper')

let ob = {}
new Array(10).fill().forEach((e, i) => ob[++i] = false);
seats = [{'A' : ob},  {'B' : ob},  {'C' : ob},  {'D' : ob},  {'E' : ob}]

class movie{
    static add = async (req , res) =>{
        try{
            console.log('home' , req);
            this.updateImg(req)
            console.log(req.body);
            const movie = new movieModel(req.body)
            movie.seats = seats
            await movie.save()
            helper.resHandler(res , 200 , true , movie , "movie added successfuly" )
        }
        catch(e){
            helper.resHandler(res , 500 , false , {} , e.message )
        }
    }
    static showMovie = async ( req ,res) => {
        const movie = await movieModel.findById(req.params.movieId)
        helper.resHandler(res , 200 , true , movie , "Show movie" )
    }
    static show = async ( req, res) => {
        const movies = await movieModel.find()
        helper.resHandler(res , 200 , true , movies , "Show Movies" )
    }
    static delete = async ( req , res ) => {
        try{
            const del = await movieModel.findByIdAndRemove(req.params.id)
            helper.resHandler(res , 200 , true , del , "movie deleted successfuly" )
        }
        catch(e){
            helper.resHandler(res , 500 , false , {} , e.message )
        }
    }
    static deleteAll = async ( req , res ) => {
        try{
            const del = await movieModel.deleteMany()
            helper.resHandler(res , 200 , true , del , "all movies have been successfuly" )
        }
        catch(e){
            helper.resHandler(res , 500 , false , {} , e.message )
        }
    }   
    static updateImg = async(req , res ) =>{
            const ext = helper.fileHandler(req)
            req.body.image = `${process.env.APPURL}${req.file.filename}.${ext}`
    }

    static edit = async ( req , res ) => {
        try{
            const movie = await movieModel.findOne({_id : req.body.id})
            for(let x in req.body){
                if(x !='id'){
                    movie[x] = req.body[x]
            }   }
            movie.save()
            helper.resHandler(res , 200 , true , movie , "movie edited successfuly" )
        }
        catch(e){
            helper.resHandler(res , 500 , false , {} , e.message )
        }
    }
}

module.exports = movie


