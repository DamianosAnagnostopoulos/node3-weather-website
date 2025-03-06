const request = require('request');

const geocode = (address, callback) => {
    if (address) {
        const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiZGFtaXRoZWRvZyIsImEiOiJjbTduM3g4NXEwcXF4MnFzYTY0Ym5qeWU4In0.l4hBVxwgdqSme5lgAXQqIg&limit=1';

        request({ url, json: true }, (error, {body} = {}) => {
            if (error) {
                callback('Unable to connect to location services!', undefined);
            } else if (body.features.length === 0) {
                callback('Unable to find location. Try another search', undefined);
            } else {
                callback(undefined, {
                    latitude: body.features[0].properties.coordinates.latitude,
                    longitude: body.features[0].properties.coordinates.longitude,
                    location: body.features[0].properties.place_formatted
                })
            }
        })
    }
}

module.exports = {
    geocode: geocode
}
