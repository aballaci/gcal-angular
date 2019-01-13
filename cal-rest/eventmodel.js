// contactModel.js
var mongoose = require('mongoose');
const querystring = require('querystring');
const qs = require('qs'); // eslint-disable-line import/no-extraneous-dependencies
var MongoQS = require('mongo-querystring');
var  Event = module.exports = mongoose.model('v_events', mongoose.Schema());

module.exports.findInView = function (req, callback, limit) {
  var mqs = new MongoQS();
  let query = {};
  console.log(req.query);
  if (req && req.query && req.query.start && req.query.end) {

    mqs.customBetween('start')(query, `${req.query.start}|${req.query.end}`);

    if (req.query.type) {
      query.type = req.query.type;
    }

    if (req.query.eventSubType) {
      query.eventSubType = req.query.eventSubType;
    }
  }
  console.log(query)
  Event.find(query, callback).sort({start: 1}).limit(limit);
}

module.exports.findById = function (req, callback) {
  var id = req.params.id;
  let query = {_id: id};
  console.log('req.query: ' + JSON.stringify(req.query));
  console.log('mongoose.query: ' + JSON.stringify(query));
  Event.find(query, callback);
}


