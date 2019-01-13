"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.SynctokenSchema = new mongoose_1.Schema({
    cal_id: String,
    sync_token: String
});
exports.Synctoken = mongoose_1.model('sync-tokens', exports.SynctokenSchema);
