const express = require('express');
const path = require('path');
const hbs = require('hbs');
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

app.get('/weather', (req, res) => {
    res.send({
        forecast: '90 degrees',
        location: 'New York',
        name: 'Francis J.'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});