const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocodes = require('./utils/geocode');
const forecasts = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDiractoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);


// Setup static directory to serve
app.use(express.static(publicDiractoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Andrew Mead'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        });
    }

    const address = req.query.address;

    geocodes.geocode(address, (error, { latitude, longitude, location } = {}) => {

        if (error) {
            return res.send({ error });
        } else {
            forecasts.forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    return res.send({ error });
                }

                res.send({
                    location,
                    address: req.query.address,
                    forecast: forecastData,
                });
            })
        }
    });
});


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Article not found.'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    });
});

app.listen(port, () => {
    console.log('Server is up on port ' + port + ' .')
});