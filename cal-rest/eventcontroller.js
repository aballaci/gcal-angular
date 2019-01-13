// contactController.js
// Import contact model
Event = require('./eventmodel');
var MongoQS = require('mongo-querystring');
const logger  = require('./logger').logger;

// Handle index actions
exports.index = function (req, res) {
  console.log(req.query)
    Event.get(function (err, eventList) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(eventList);
    });
};
// Get events by type
exports.getByType = function (req, res) {
    Event.getByType(req.params.type, function (err, eventList) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(eventList);
    });
};

// Get events by type
exports.fullEvents = function (req, res) {
    Event.findInView(req, function (err, eventList) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(eventList);
    });
};

// Get event by id
exports.getById = function (req, res) {
    Event.findById(req, function (err, eventList) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json(eventList);
    });
};



// Handle view contact info
exports.view = function (req, res) {
    Event.find({}, function (err, eventList) {
        if (err)
            res.send(err);
        res.json(eventList);
    });
};

// Handle view contact info
exports.notify = function (req, res) {
  const { headers, method, url } = req;
  let body = [];
  req.on('error', (err) => {
    logger.error(err);
  }).on('data', (chunk) => {
    body.push(chunk);
  }).on('end', () => {
    body = Buffer.concat(body).toString();
    // At this point, we have the headers, method, url and body, and can now
    // do whatever we need to in order to respond to this request.
    logger.info({
      'headers': headers,
      'method': method,
      'url': url,
      'body': body
    })
  });

  res.json()
};
