const file = require('../helper/dealWithJson')
const mongodb = require('../model/dbController')
class todo{
    static home = (req , res) => {
        try{
            connectDb(async(db)=>{
            const list =  await db.collection("users").find()
            res.render('home.hbs' , {list})
            })
        }
        catch(e){
                console.log('error');
                res.send(e)
            }
    }
    static add = (req , res ) => {
        res.render('add.hbs')
    }
        static addLogic = async(req,res)=>{
        try{
            connectDb(async(db)=>{
                console.log("suc");
                const task = {'id' : Date.now() , ...req.body, status : false ,  'date' : d.toDateString().slice(0, 15)}
                await db.collection("users").insertOne(task)
                res.redirect("/")
            })
        }
        catch(e){
            console.log('error');
            res.send(e)
        }
    }
    static show = (req , res ) => {
        const task  = db.collection("users").find({id : req.params.id})
        res.render('show.hbs' , {task })
    }
    static delete = (req , res ) => {
        db.collection("users").deleteOne({id : req.params.id})
        res.redirect('/')
    }
    static deleteAll = (req , res ) => {
        db.collection("users").deleteMany()
        res.redirect('/')
    }
    static activate = (req , res ) => {
        db.collection("users").updateOne({id : req.params.id }, { $set : { status : true } })
        res.redirect('/')
    }
    static edit = (req , res ) => {
        const list  = db.collection("users").find()
        const task = list.find(task => task.id == req.params.id)
        res.render('edit.hbs' , {task , id : req.params.id})
    }
    static editLogic = (req , res ) => {
        const task = db.collection("users").replaceOne({id : req.params.id} , { id : req.params.id , title :req.body.title , content : req.body.content })
        res.redirect('/')
    }
        static search = async( req , res ) => {
            const list =  db.collection("users").find()
            let result = []
            list.map(task => {
                (task.title.toLowerCase().includes(req.query.search.toLowerCase()) || task.content.toLowerCase().includes(req.query.search.toLowerCase())) ? result.push(task) : null
            })
            res.render('filtered.hbs' , {result , isEmpty : !result.length})
    }
}

module.exports = todo