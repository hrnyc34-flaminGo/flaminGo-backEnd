db.createCollection('tasks', {
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
