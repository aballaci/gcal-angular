const mongoose = require("mongoose");

const syncTokenSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cal_id: String,
  sync_token: String
});

var SyncToken = mongoose.model("sync-tokens", syncTokenSchema);

module.exports = SyncToken;
