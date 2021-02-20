db.createCollection('roomtypes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'roomType',
        'price'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        'roomType': {
          bsonType: 'string',
        },
        'price': {
          bsonType: 'decimal'
        },
        'amenities': {
          bsonType: ['array'],
          minItems: 0,
          items: {
            bsonType: 'string'
          }
        },
      }
    }
  }
});