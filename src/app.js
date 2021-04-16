const express = require('express');

const app = express();

app.get('', (req, res) => {
    res.send(`
        <h1>Welcome</h1>
    `);
});

app.get('/help', (req, res) => {
    res.send({
        name: 'Francis',
        age: 34
    });
});

app.get('/about', (req, res) => {
    res.send(
        '<h1>About</h1>'
    )
})

app.get('/weather', (req, res) => {
    res.send({
        forecast: '90 degrees',
        location: 'New York'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});