var mongoose = require('mongoose');
var assert = require('assert');
var should = require('chai').should();
var eventModel = require('../eventmodel');
var MongoQS = require('mongo-querystring');
let mqs = null;
let query = null;

beforeEach(() => {
  mqs = new MongoQS();
  query = {};
});

  describe('test the event model selections', function(){

    before(function (done) {
      mongoose.connect('mongodb://localhost/salsa-events', { useNewUrlParser: true });
      const db = mongoose.connection;
      db.on('error', console.error.bind(console, 'connection error'));
      db.once('open', function() {
        console.log('We are connected to test database!');
        done();
      });
    });

    it('should get calendar events agregated async', function(done) {
      this.timeout(5000);
      //Look up the 'Mike' object previously saved.
      eventModel.getByType('workshop', function(err, res){
        if(err) {throw err;}
        console.log("db response: " +  res);
        done();
      });
    });

    it('find in view', function(done) {
      this.timeout(5000);
      //Look up the 'Mike' object previously saved.
      var res = eventModel.findInView(null, function (err, res) {
        if(err) {return;}
          console.log(res);
        done();
      })

    });


});

