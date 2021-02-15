db.createCollection('employees', {
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
