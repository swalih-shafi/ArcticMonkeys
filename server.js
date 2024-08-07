const express = require('express');
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const path = require('path')
const fs = require('fs');

mongoose.connect('mongodb://localhost:27017/ArcticMonkeys', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

const ShopRoute = require('./routes/ShopRoute')

db.on('error', (err) => {
    console.log(err)
})

db.once('open', () => {
    console.log("Database connected successfully")
})
app.use('*/albums', express.static(path.join(__dirname, 'albums')))
app.use('*/wallpapers', express.static(path.join(__dirname, 'wallpapers')))
app.use('*/json', express.static(path.join(__dirname, 'json')))
app.use('*/js', express.static(path.join(__dirname, 'js')))
app.use('*/style', express.static(path.join(__dirname, 'style')))
app.use('*/images', express.static(path.join(__dirname, 'images')))
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

app.use('/shop', ShopRoute)

app.use('/cart',(req,res,next)=>{
    let html = fs.readFileSync('./cart.html')
    res.end(html)
})
app.use('/albums', (req, res, next) => {
    let html = fs.readFileSync('./albums.html')
    res.end(html)
})
app.use('/index', (req, res, next) => {
    console.log("rendering html")
    let html = fs.readFileSync('./index.html')
    res.end(html)
})

app.use('/live', (req, res, next) => {
    console.log("rendering html")
    let html = fs.readFileSync('./live.html')
    res.end(html)
})

app.use('/mail', (req, res, next) => {
    let html = fs.readFileSync('./mail.html')
    res.end(html)
})

app.use('/devs', (req, res, next) => {
    let html = fs.readFileSync('./devs.html')
    res.end(html)
})

app.use((req, res, next) => {
    const error = new Error("The url not found")
    error.status = 400
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

