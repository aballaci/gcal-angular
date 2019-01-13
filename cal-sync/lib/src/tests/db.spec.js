"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("mocha");
const mongoose_1 = __importDefault(require("mongoose"));
const assert_1 = __importDefault(require("assert"));
const chai = require("chai");
const chai_1 = require("chai");
const chaiDateTime = require("chai-datetime");
chai.use(chaiDateTime);
chai_1.should();
const Synctoken = require('../sync.token');
const expect = chai.expect;
describe('Database Tests', function () {
    // Before starting the test, create a sandboxed database connection
    // Once a connection is established invoke done()
    before(function (done) {
        mongoose_1.default.connect('mongodb://localhost/test-db', { useNewUrlParser: true });
        const db = mongoose_1.default.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function () {
            console.log('We are connected to test database!');
            done();
        });
    });
    // Save object with 'name' value of 'Mike"
    it('synctoken save', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const DUMMY_CAL_ID = 'test_cal_id';
            const DUMMY_SYNC_TOKEN = 'test_cal_id';
            const token = { cal_id: DUMMY_CAL_ID, sync_token: DUMMY_SYNC_TOKEN };
            yield Synctoken.updateOne({ 'cal_id': DUMMY_CAL_ID }, { $set: token }, { upsert: true }).catch(console.error);
            const dbToken = yield Synctoken.findOne({ 'cal_id': DUMMY_CAL_ID }).catch(console.error);
            assert_1.default(dbToken != null);
            // @ts-ignore
            dbToken.cal_id.should.equal(token.cal_id);
            // @ts-ignore
            dbToken.sync_token.should.equal(token.sync_token);
        });
    });
    // After all tests are finished drop database and close connection
    after(function (done) {
        mongoose_1.default.connection.db.dropDatabase(function () {
            mongoose_1.default.connection.close(done);
        });
    });
});
