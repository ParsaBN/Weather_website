const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9ee7352520b53896acd144a7068b94d1/' + latitude + ', ' + longitude + '?units=si'

    request({url, json:true},  (error, {body} ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                currentTemperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability,
                temperatureLow: body.daily.data[0].temperatureMin,
                temperatureHigh: body.daily.data[0].temperatureMax
            })
        }
    })
}

module.exports = forecast

// Example url for json data of new york from darksky
// https://api.darksky.net/forecast/9ee7352520b53896acd144a7068b94d1/40.7128,-74.0060?units=si

// summary forecast
// body.daily.data[0].summary + ' throughout the day. It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.'