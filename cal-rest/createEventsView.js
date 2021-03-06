db.createView("v_events", "events", [
  {
    $lookup: {
      from: "calendars",
      localField: "calendarId",
      foreignField: "id",
      as: "evt_ext"
    }
  },{
    $replaceRoot: {
      newRoot: {
        $mergeObjects: [
          {
            $arrayElemAt: [
              "$evt_ext",
              0
            ]
          },
          "$$ROOT"
        ]
      }
    }
  },{
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
      eventSubType: 1,
      tags: 1,
      defaultLocation: 1
    }
  }
]);
