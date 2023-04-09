const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3326ec4ac56aa63c54dea668963ac563&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect Weather service", undefined);
    } else if (body.error) {
      callback("Unable to find location try another search", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " Weather, it is currently " +
          body.current.temperature +
          " degrees outside but feels like " +
          body.current.feelslike +
          " deegrees."
        // location: body.location.name,
        // weather_description: body.current.weather_descriptions[0],

        // temperature: body.current.temperature,

        // feels_like: body.current.feelslike,
      );
    }
  });
};

module.exports = forecast;
