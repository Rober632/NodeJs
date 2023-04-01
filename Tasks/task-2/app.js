const deal = require('./dealWithJson')
const fileName='data.json'
const yargs = require('yargs')
const { argv } = require('yargs')


const handeledit = (d, name , email , age) => {
    d.name = name , d.email = email ,d.age = age
    return d
}
yargs.command({
    command : 'addUser' ,
    builder : {
        name : { demandOption : true},
        email : { demandOption : true},
        age : { demandOption : true}
    } ,

    handler : () => { 
        const data = deal.ReadJson(fileName)
        const userData = { id : Date.now() , name : argv.name , email : argv.email ,Age : argv.age}
        data.push(userData)
        deal.WriteJson(fileName ,data)}
})
yargs.command({
    command : 'showUsers' , 
    handler : () => { 
        const data = deal.ReadJson(fileName)
        if (data.length){
        console.log(data)}
        else{
            console.log('No Users')
        }
    }
})
yargs.command({
    command : 'showUser' , 
    builder : {
        id : { demandOption : true}
    },
    handler : () => { 
        const data = deal.ReadJson(fileName)
        const res = data.find(user => user.id === argv.id)
        if(res){
        console.log(res)
        }
        else{
            console.log('Wrong ID');
        }
    }
})
yargs.command({
    command : 'edit' ,
    builder : {
        id:{demandOption : true},
        name : { demandOption : true},
        email : { demandOption : true},
        age : { demandOption : true}
    } ,

    handler : () => { 
        const data = deal.ReadJson(fileName)
        data.forEach(d=>{d.id === argv.id ?
        handeledit(d, argv.name , argv.email , argv.age): null})
        deal.WriteJson(fileName,data)
}})

yargs.command({
    command : 'deleteAll' , 
    handler : () => { 
        deal.WriteJson(fileName, [])
    }
})

yargs.command({
    command : 'delete' , 
    builder : {
        id : { demandOption : true}
    },
    handler : () => { 
        const data = deal.ReadJson(fileName)
        const res = data.filter(user => user.id != argv.id)
        deal.WriteJson(fileName,res)
    }
})

yargs.argv
