// api-routes.js
// Initialize express router
let router = require('express').Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});
// Import contact controller
var eventController = require('./eventcontroller');

// Event routes
router.route('/events').get(eventController.index);

router.route('/filtered/events').get(eventController.fullEvents);

router.route('/filtered/events/:id').get(eventController.getById);

router.route('/events/:type').get(eventController.getByType);

//router.route('/events/:start_date').get(eventController.view);

router.route('/notify').post(eventController.notify);

// Export API routes
module.exports = router;
