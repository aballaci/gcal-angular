import 'mocha';
import mongoose from 'mongoose';
import assert from 'assert';
import chai = require('chai');
import { should } from 'chai';
import chaiDateTime = require('chai-datetime');
import { ISynctokenModel } from '../sync.token';
chai.use(chaiDateTime);
should();

const Synctoken = require('../sync.token');

const expect = chai.expect;

describe('Database Tests', function() {
  // Before starting the test, create a sandboxed database connection
  // Once a connection is established invoke done()
  before(function (done) {
    mongoose.connect('mongodb://localhost/test-db', { useNewUrlParser: true });
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', function() {
      console.log('We are connected to test database!');
      done();
    });
  });
    // Save object with 'name' value of 'Mike"
    it('synctoken save', async function() {
      const DUMMY_CAL_ID = 'test_cal_id';
      const DUMMY_SYNC_TOKEN = 'test_cal_id';
      const token: any = {cal_id: DUMMY_CAL_ID, sync_token: DUMMY_SYNC_TOKEN};

      await Synctoken.updateOne({'cal_id': DUMMY_CAL_ID}, {$set: token}, {upsert: true}).catch(console.error);
      const dbToken: ISynctokenModel = await Synctoken.findOne({'cal_id': DUMMY_CAL_ID}).catch(console.error);
      assert(dbToken != null);
      // @ts-ignore
      dbToken.cal_id.should.equal(token.cal_id);
      // @ts-ignore
      dbToken.sync_token.should.equal(token.sync_token);
    });


  // After all tests are finished drop database and close connection
  after(function(done) {
    mongoose.connection.db.dropDatabase(function() {
      mongoose.connection.close(done);
    });
  });
});
