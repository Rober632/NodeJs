const dbConnect=(cb)=>{
    const {MongoClient} = require("mongodb")
    const dbUrl="mongodb://localhost:27017"
    const dbName="todo"
    MongoClient.connect(dbUrl,{},(err,client)=>{
        if(err) return console.log("error in connecting..")
        const db =client.db(dbName)
        cb(db, client)
    })
}
module.exports=dbConnect