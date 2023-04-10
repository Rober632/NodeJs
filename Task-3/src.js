const router = require('./routes/todoRoutes')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()


const staticDir = path.join(__dirname ,'/resources/public')
const viewDir = path.join(__dirname ,'/resources/views')
const partialDir = path.join(__dirname ,'/resources/layout')

app.use(express.urlencoded({extended : true}))
app.use(router)
app.use(express.static(staticDir))
app.set("view engine" , "hbs")
app.set('views' , viewDir)
hbs.registerPartials(partialDir)


module.exports = app