const mongoose = require("mongoose");

const weatherEntrySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  city: { type: String, required: true },
  countryCode: { type: String, required: true },
});

const WeatherEntry = mongoose.model("WeatherEntry", weatherEntrySchema);

module.exports = WeatherEntry;
