const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const mongoose  = require('mongoose')
const Movie = require("../model/MovieModel")

const userSchema = mongoose.Schema({
    name : {type : String , required : true} , 
    email : {type : String , required : true , unique: true} , 
    password : {type : String , required : true},
    role : { type : String , default : "Basic" , enum : ["Basic" , "Admin"]},
    tickets : [ {   "ticket" : 
     { "movie" : {name : String , description : String  , genres : String , seat : Number , screen : Number , _id : String}, bookTime : {type : String} , seat : {type : Array}, screen : {type : Number} } 
    }],  
    tokens : [{"token" : {type : String}}] 
})
    userSchema.methods.generateToken = async function(){
        this.tokens = []
        const token = jwt.sign({_id : this.id} , process.env.JWTKEY , { expiresIn: '1h' })
        this.tokens = this.tokens.concat({token})
        await this.save()
        return token
    }
userSchema.pre("save" , async function(){
    if(this.isModified("password"))
    this.password = await bcrypt.hash(this.password , 12)
})
module.exports =  userModel = mongoose.model("Users" , userSchema)

