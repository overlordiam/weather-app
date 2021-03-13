const request = require('request')

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoib3ZlcmxvcmRpYW0iLCJhIjoiY2tsejM3eDI1Mjk2cjJwcDNtbnR6Y20waSJ9.b8F0S9ClC_-4IRu5s5xztg&limit=1"
    request({url, json: true}, (error, { body }) => {
        if(error) {
            callback('There seems to be a problem with the location services', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another one', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
        
    })
}

module.exports = geocode