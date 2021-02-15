db.createCollection('tasks', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [],
      properties: {
        'room_id': {
          bsonType: 'object_id',
        },
        'location': {
          bsonType: 'string'
        },
        'taskTitle': {
          bsonType: 'string',
        },

      }
    }
  }
});
