db.createCollection('roomtypes', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'roomType',
        'price'
      ],
      properties: {
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