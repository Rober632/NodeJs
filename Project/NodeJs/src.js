require("./db/dbConnect")
const express = require("express")
const path = require('path')
const app = express()
var cors = require('cors');
app.use(cors())
const userRoutes = require("./routes/userRoutes")
const movieRoutes = require("./routes/movieRoutes")
const staticDir = path.join(__dirname ,'/resources/public')
app.use(express.static(staticDir))
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(userRoutes)
app.use('/movie/' ,movieRoutes)

module.exports = app