db.createCollection('reservations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'idString',
        'bookingGuest',
        'checkIn',
        'checkOut',
        'roomType_id',
        'totalCost',
        'guestList'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        'idString': {
          bsonType: 'string',
        },
        'bookingGuest': {
          bsonType: 'object',
        },
        'room_id': {
          bsonType: ['objectId', 'string'],
        },
        'checkIn': {
          bsonType: 'date',
        },
        'checkOut': {
          bsonType: 'date',
        },
        'roomType_id': {
          bsonType: 'objectId'
        },
        'guestList': {
          bsonType: ['array'],
          minItems: 0,
          items: {
            bsonType: 'object'
          }
        },
        'totalCost': {
          bsonType: 'decimal'
        }
      }
    }
  }
});
