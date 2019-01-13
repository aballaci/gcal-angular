var eventProjection = {
  $project: {
    id: 1,
    type: 1,
    start: 1,
    end: 1,
    status:1,
    description:1,
    summary:1,
    attachments:1,
    location:1,
    thumbnail: 1,
    dafaultLocation: 1,
    telefon: 1,
    event_organiser: 1,
    website: 1,
    categories: 1,
    tags: 1
  }
}

var eventReplaceRoot =  {
  $replaceRoot: {
    newRoot: {
      $mergeObjects: [
        {
          $arrayElemAt: [
            "$events_ext",
            0
          ]
        },
        "$$ROOT"
      ]
    }
  }
}

var eventLookup = {
  $lookup: {
    from: "calendars",
    localField: "calendarId",
    foreignField: "id",
    as: "events_ext"
  }
}


module.exports.eventAgregator = [eventLookup, eventReplaceRoot, eventProjection]
