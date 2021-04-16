const express = require('express');
const path = require('path');
const publicDir = path.join(__dirname, '../public');

const app = express();

app.use(express.static(publicDir));

app.get('/weather', (req, res) => {
    res.send({
        forecast: '90 degrees',
        location: 'New York'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});