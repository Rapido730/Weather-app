const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=3bd69158ecf8dabdeff8a5187b24db53&query=' + latitude + ',' + longitude + '&units=m'
    request({ url, json : true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather service!', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        } else { 
            callback(undefined , body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.\n'+'  Humidity is around ' + body.current.humidity +'% and wind speed is ' + body.current.wind_speed +' km/h.')
        }
    })
        
    
}
    

module.exports = forecast