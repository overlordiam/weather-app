const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=a284f7d3636eac1a1e27c744f005750b&query=" + latitude + "," + longitude + "&units=f"
    request({url: url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to the local services.', undefined)
        } else if(body.error) {
            callback('Unable to find location. Try another one.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out but feels like " + body.current.feelslike + " degrees out and an expected humidity of " + body.current.humidity + "%")
        }
    })
}

module.exports = forecast