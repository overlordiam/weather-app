const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/weather-data')

const app = express()

//Define path for express config
const publicDirectoryPath = path.join(__dirname, '../public') 
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and path for views
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve to browser
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'suhaas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Suhaas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        contact: 5555556666,
        title: 'Help',
        name: 'Suhaas'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            errorMessage: 'Please enter an address'
        })
    }
    
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, location} ={}) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                })
            }
            res.send({
                forecast,
                location,
                address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('page404', {
        errorMessage: 'Page 404',
        title: 'Help article not found',
        name: 'suhaas'
    })
})

app.get('*', (req, res) => {
    res.render('page404', {
        errorMessage: 'Page 404',
        title: 'Page not found',
        name: 'suhaas'
    })
})







app.listen(3000, () => {
    console.log('server up and running')
})