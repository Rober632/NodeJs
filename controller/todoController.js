const file = require('../helper/dealWithJson')
const dbConnect = require('../model/dbController')

class todo{
    static home = (req,res)=>{  
        dbConnect(db=> 
                db.collection("todo").find().toArray((error , list)=>{
                    res.render("home.hbs", { pageTitle:"Home", list ,isEmpty: !list.length
                    })
        })
        )}
    static add = (req , res ) => {
        res.render('add.hbs')
    }
    static addLogic = async(req,res)=>{
            dbConnect((db)=>{
                const d = new Date()
                const task ={'id' : Date.now() , ...req.body ,status : false , 'date' : d.toDateString().slice(0, 15)}
                db.collection("todo").insertOne(task)
                .then(()=>res.redirect("/"))
                .catch(e=>console.log(e))
            })
    }
    // []
    static show = (req , res ) => {
        dbConnect( (db)=>{
            db.collection("todo").find({id : req.params.id}).toArray((error , task) => {
                console.log(task);
                res.render('show.hbs' , { task } ) })
            })
          
        
    }
    static delete = (req,res)=>{
        const postId = req.params.id
        dbConnect(db=>
        db.collection("todo")
        .deleteOne({id:postId})
            .then(r=> res.redirect("/"))
        )
    }
    static deleteAll = (req , res ) => {
        dbConnect(db=> 
            db.collection("todo").deleteMany())
            res.redirect('/')
    }
    static activate = (req , res ) => {
        dbConnect(db=> 
        db.collection("users").updateOne({id : req.params.id }, { $set : { status : true } }))
        res.redirect('/')
    }
    static edit=(req,res)=>{
        dbConnect(db=>{
            db.collection("users").findOne({id:req.params.id})
            .then( task=> res.render("edit.hbs", {task}))
            })
    }
    static activate = (req , res ) => {
        dbConnect(db=> 
            db.collection("todo").updateOne({id : req.params.id }, { $set : { "status" : true } }))
            console.log(req.params.id);
            res.redirect('/')
    }
    static editLogic = (req,res)=>{
        dbConnect(db=>{
            db.collection("users").updateOne({id: (req.params.id)},{ $set:req.body })
            .then(r=>res.redirect("/"))
        }  )
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