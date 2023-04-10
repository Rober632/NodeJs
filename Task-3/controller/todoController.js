const file = require('../helper/dealWithJson')

class todo{
    static home = (req , res) => {
        const list =  file.Read(process.env.fname) || [] 
        res.render('home.hbs' , {list})

    }
    static add = (req , res ) => {
        res.render('add.hbs')
    }
    static addLogic = (req , res ) => {
        const list =  file.Read(process.env.fname) || [] 
        const d = new Date()
        const task = {'id' : Date.now() , ...req.body, status : false ,  'date' : d.toDateString().slice(0, 15)}
        list.push(task)
        file.Save(process.env.fname , list )
        res.redirect('/')
    }
    static show = (req , res ) => {
        const list =  file.Read(process.env.fname) || [] 
        const task = list.find(task => task.id == req.params.id)
        res.render('show.hbs' , {task })
    }
    static delete = (req , res ) => {
        var list =  file.Read(process.env.fname) || [] 
        var list = list.filter(task => task.id != req.params.id)
        file.Save(process.env.fname , list )
        res.redirect('/')
    }
    static deleteAll = (req , res ) => {
        file.Save(process.env.fname , [] )
        res.redirect('/')
    }
    static activate = (req , res ) => {
        const list =  file.Read(process.env.fname) || [] 
        var task = list.find(task => task.id == req.params.id)
        console.log(task)
        task.status = true
        file.Save(process.env.fname , list )
        res.redirect('/')
    }
    static edit = (req , res ) => {
        const list =  file.Read(process.env.fname) || [] 
        const task = list.find(task => task.id == req.params.id)
        res.render('edit.hbs' , {task , id : req.params.id})
    }
    static editLogic = (req , res ) => {
        const list =  file.Read(process.env.fname) || [] 
        var task = list.find(task => task.id == req.body.id)
        task.title = req.body.title
        task.content = req.body.content
        file.Save(process.env.fname , list )
        res.redirect('/')
    }
        static search = async( req , res ) => {
            const list =  file.Read(process.env.fname)
            let result = []
            list.map(task => {
                (task.title.toLowerCase().includes(req.query.search.toLowerCase()) || task.content.toLowerCase().includes(req.query.search.toLowerCase())) ? result.push(task) : null
            })
            res.render('filtered.hbs' , {result , isEmpty : !result.length})
    }
}

module.exports = todo