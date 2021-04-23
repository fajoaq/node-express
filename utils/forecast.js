const request = require('postman-request');
const WS_API_KEY = process.env.WEATHERSTACK_API_KEY || require('../api/weatherstack');

const forecast = (longitude, latitude, callback) => {
    const units = 'f';
    const url = `http://api.weatherstack.com/current?access_key=${WS_API_KEY}&query=${longitude},${latitude}&units=${units}`

    request({ url, json: true }, (error, { body } = {}) => {
        if(error) {
            console.log("Unable to connect to weather service.")
            callback(error, undefined);
        } else if(body.error) {
            const { error } = body;

            console.log("Unable to find location.")
            callback(error, undefined);
        } else {
            const { temperature, feelslike, weather_descriptions } = body.current;
            const data = `It is currently ${temperature}${units} out, ${weather_descriptions[0].toLowerCase()}. It feels like ${feelslike}${units}.`;

            callback(undefined, data)
        }
    });
};

module.exports = forecast;