const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

// define paths for express config
const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPaths = path.join(__dirname, '../templates/partials')

// Setup ahndelbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPaths)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'PastaLaVista'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'PastaLaVista'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpfulText: 'Helpful stuff',
        name: 'PastaLaVista'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})    

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search'
        })
    }
    // console.log(req.query.search)
    res.send({
        products: []
    })
    

    
})

app.get('/help/*', (req, res) => {
    // console.log(req._parsedOriginalUrl._raw)
    res.render('404', {
        title: '404',
        errorMessage: 'Help article ' + req._parsedOriginalUrl._raw + ' not found',
        name: 'PastaLaVista'
    })
})

// *, the wildcard character means everything is a match
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: '404 page ' + req._parsedOriginalUrl._raw + ' not found',
        name: 'PastaLaVista'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port on 3000.')
})
