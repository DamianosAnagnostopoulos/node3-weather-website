const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=9ab4af109a057f6958b31446137132d8&query=' + latitude + ',' + longitude;
    
    request({ url, json: true }, (error, {body} = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.error) {
            callback('Unable to find location. Try another search', undefined);
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ' throughout the day. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

module.exports = {
    forecast: forecast
}