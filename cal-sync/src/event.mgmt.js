let EventEmitter = require('events').EventEmitter
let notifier = new EventEmitter()
module.exports = notifier

module.exports.constants = Object.freeze({
  CAL_DB_RES: 'cal-db-res',
  CAL_API_RES: 'cal-api-res',
  CAL_TOKEN_DB_RES: 'cal-token-db-res',
  CAL_TOKEN_UPDATED: 'cal-token-upd',
  EVENT_TOKEN_DB_RES : 'event-token-db-res',
  EVENTS_API_RES: 'events-api-res',
  EVENTS_API_NEXT_PAGE_RES: 'events-api-next-page-res'
});
