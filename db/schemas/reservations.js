db.createCollection('reservations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [],
      properties: {
        'property': {
          bsonType: 'int',
        },
      }
    }
  }
});
