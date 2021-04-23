const request = require('postman-request');
const GEO_API_KEY = process.env.GEOCODE_API_KEY || require('../api/geocoding');

const geocode = (address, callback) => {
    const uriComponent = encodeURIComponent(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${uriComponent}.json?access_token=${GEO_API_KEY}&limit=1`;

    request({ url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services', undefined);
        } else if(body.features.length === 0) {
            callback('No matching results. Try another location.', undefined)
        } else {
            const { center, place_name: location } = body.features[0];
            
            callback(undefined, { 
                longitude: center[0], 
                latitude: center[1], 
                location 
            });
        }
    });
};

module.exports = geocode;