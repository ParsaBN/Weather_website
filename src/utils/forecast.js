const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9ee7352520b53896acd144a7068b94d1/' + latitude + ', ' + longitude + '?units=si'

    request({url, json:true},  (error, {body} ) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' throughout the day. It is currently ' + body.currently.temperature + ' degrees out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast


// {
//     temp: response.body.currently.temperature,
//     precip: response.body.currently.precipProbability,
//     summary: response.body.daily.data[0].summary
// }