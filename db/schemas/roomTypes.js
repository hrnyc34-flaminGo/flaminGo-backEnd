db.createCollection('roomTypes', {
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
        }
      }
    }
  }
});
