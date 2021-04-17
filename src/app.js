const express = require('express');
const path = require('path');
const publicDir = path.join(__dirname, '../public');

const app = express();

app.set('view engine', 'hbs');

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
        message: 'Get some help with the app.'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: '90 degrees',
        location: 'New York'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});