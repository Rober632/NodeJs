const app = require('./src')

require('dotenv').config()


app.listen( process.env.PORT , () => console.log(`you are on http://localhost:${process.env.PORT}`))