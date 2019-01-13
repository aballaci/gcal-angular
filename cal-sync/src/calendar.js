const mongoose = require("mongoose");

const calendarSchema = new mongoose.Schema({id: String},{ strict: false });

var Calendar = mongoose.model("calendars", calendarSchema);

module.exports = Calendar;
