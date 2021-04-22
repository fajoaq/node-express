const express = require('express');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');
const path = require('path');
const hbs = require('hbs');
const e = require('express');
const app = express();

//Define paths for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlerbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDir));

function getForecastByAddress(address, callback) {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if(error) callback({ error });
        else if(location) {
            forecast(latitude, longitude, (error, forecastData) => {
                if(error) console.log("Error: ", error);
                else if(forecastData) callback({ address, location, forecast: forecastData });
            });
        }
    });
};

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Francis J.'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Francis J.'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Get some help with the app.',
        name: 'Francis J.'
    });
});

//WEATHER
app.get('/weather', async (req, res) => {
    const { address } = req.query;

    if(!address) {
        return res.send({
            error: "You must provide a location."
        })
    }

    getForecastByAddress(address, (data) => {
        if(data.error) res.send({ error: data.error});
        else if(data.forecast) res.send(data);
    })
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        message: 'Help article not found.',
        name: 'Francis J.'
    })
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'My 404 message.',
        name: 'Francis J.'
    })
});

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});