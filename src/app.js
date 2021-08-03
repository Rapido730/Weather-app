const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res) => {
    res.render('index', {
        title: 'weather',
        name : 'amit'
    })
})

app.get('/about',(req,res) => {
    res.render('about', {
        title : 'about me',
        name : 'amit'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        help_msg : 'contact us',
        title : 'help!',
        name : 'amit'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title : '404',
        msg : 'help article not found',
        name : 'amit'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
    {
        return res.send({
            error: "you must enter an address"
        })
    }

    geocode(req.query.address, (error,{latitude,longitude,location} = {}) => {
        if(error){
            return res.send({
                error
            })
        }

        forecast(latitude,longitude, (error,forecastdata)  => {
            if(error){
            return res.send({
                error
            })
        }

        res.send({
            forecast:forecastdata,
            location,
            address:req.query.address
        })
        })
    })
})

app.get('/products', (req,res) => {
    if(!req.query.item)
    {
        return res.send({
            error:'you must enter something'
        })
    }
    console.log(req.query.item)
    res.send({
        products: []
    })
})


app.get('*', (req, res) => {
        res.render('404', {
            title : '404',
            msg : 'page not found',
            name : 'amit'
        })
})

app.listen(3000,() => {
    console.log('server is up on port 3000.')
})