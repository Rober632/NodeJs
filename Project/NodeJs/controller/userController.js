const userModel = require("../db/model/userModel")
const movieModel = require("../db/model/MovieModel")
const helper = require("../helper")
const bcrypt = require("bcrypt")
class Users{
    static home = (req , res) =>{
        res.send("home")
    }
    static show = async (req , res) => {
        const users = await userModel.find().populate("tickets.ticket.movie")
        helper.resHandler(res , 200 ,true, users , "User ")
    }
    static delete = async (req , res) => {
        const del = await userModel.deleteMany()
        helper.resHandler(res , 200 ,true, {} , "All users have been deleted")
    }
    static book = async ( req , res ) => {
        try{
            let bookedseat = null
            let [row , seat] = req.body.seat
            let x = null
            switch(row){
                case 0 :  bookedseat = ['A',seat]
                x = 'A'
                break;
                case 1 : bookedseat = ['B',seat]
                x = 'B'
                break;
                case 2 : bookedseat = ['C' , seat]
                x = 'C'
                break;
                case 3 : bookedseat = ['D' , seat]
                x='D'
                break;
                case 4 : bookedseat = ['E' , seat]
                x='E'
            }
            bookedseat = bookedseat.toString().replace(',','')
            const user = await userModel.findById(req.body.id)
            if(!user){throw new Error("User Not Found")}
            let movie = await movieModel.findById(req.body.movie)
            if(!movie){throw new Error("User Not Found")}
            if(movie.seats[row][x][seat] == true){throw new Error("seat is already booked")}
            const ticket = {"movie" : movie , bookTime : new Date() , seat : bookedseat , screen : req.body.screen}
            movie.seats[row][x][seat] = true
            user?.tickets.push({ticket})
            movie.markModified('tickets');
            user.save()
            movie.seats[0][seat] = true
            movie.markModified('seats');
            movie.save()
            
            helper.resHandler(res , 200 ,true, {user} , "movie booked successfuly")
        }
        catch(e){
            helper.resHandler(res , 500 ,false, {} , e.message)
        }
    }
    static register = async( req , res) => {
        try{
        const userData = new userModel(req.body)
        await userData.save()
        helper.resHandler(res , 200 ,true, userData , "User added successfuly")
        }
        catch(e){
            helper.resHandler(res , 500 ,false, {} , e.message)
        }
    }
    static login = async ( req , res ) => {
        try{
            const userData = await userModel.findOne({"email" : req.body.email})
            if(!userData) throw new Error("User not found")
        const matched = await bcrypt.compare(req.body.password , userData.password)
            if(!matched) throw new Error("wrong password")
            const token =await userData.generateToken() 
        helper.resHandler(res , 200 ,true, {userData , token} , "User logged in  successfuly")
        }
        catch(e){
            helper.resHandler(res , 500 ,false, {} , e.message)
        }
    }


}

module.exports = Users
