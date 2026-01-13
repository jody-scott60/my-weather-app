const WeatherEntry = require("../models/weatherEntry");

const postWeather = async (req, res) => {
  try {
    const { city, countryCode } = req.body;
    const alreadyExists = await WeatherEntry.findOne({
      city: city,
      countryCode: countryCode,
      user: req.userId,
    });
    if (!alreadyExists) {
      return res.status(400);
    }
    await WeatherEntry.create({
      city: city,
      countryCode: countryCode,
      user: req.userId,
    });
    res.status(200);
    console.log("Created: ", city, countryCode);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const getWeather = async (req, res) => {
  try {
    const result = await WeatherEntry.find({ user: req.userId });
    res.status(200).json(result);
    console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

const deleteWeather = async (req, res) => {
  try {
    const { city, countryCode } = req.body;
    const result = await WeatherEntry.deleteOne({
      city: city,
      countryCode: countryCode,
      user: req.userId,
    });
    res.status(200);
    console.log(result);
  } catch (error) {
    console.error(error);
    res.status(500);
  }
};

module.exports = { postWeather, getWeather, deleteWeather };
