const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({id: String},{ strict: false });

var Event = mongoose.model("events", eventSchema);

module.exports = Event;
