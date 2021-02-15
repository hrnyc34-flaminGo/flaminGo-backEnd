db.createCollection('rooms', {
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
