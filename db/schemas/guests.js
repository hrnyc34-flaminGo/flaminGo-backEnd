db.createCollection('guests', {
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
