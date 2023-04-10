const fs = require('fs')

class DealWithJson{
    static WriteJson(fileName , data){
        fs.writeFileSync(fileName,JSON.stringify(data))
    }
    static ReadJson(fileName){
        let result
        try{
            result = JSON.parse(fs.readFileSync(fileName))
            if(!Array.isArray) throw new Error ('Not an Array')
        }
        catch(e){
            result=[]
            console.log(e.message)
        }
        return result
    }
}
module.exports = DealWithJson