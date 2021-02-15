db.createCollection('rooms', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'roomType_id',
        'roomNumber',
        'amenities',
        'isClean',
        'isOccupied',
        'isUsable'
      ],
      properties: {
        'reservation_id': {
          bsonType: 'objectId'
        },
        'roomType_id': {
          bsonType: 'objectId'
        },
        'roomNumber': {
          bsonType: 'string'
        },
        'floorNumber': {
          bsonType: 'int'
        },
        'amenities': {
          bsonType: ['array'],
          minItems: 0,
          items: {
            bsonType: 'string'
          }
        },
        'isClean': {
          bsonType: 'boolean',
        },
        'isOccupied': {
          bsonType: 'boolean'
        },
        'isUsable': {
          bsonType: 'boolean'
        }
      }
    }
  }
});
