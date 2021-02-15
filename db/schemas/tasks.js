db.createCollection('tasks', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'location',
        'taskTitle',
        'department',
        'createdAt',
        'isCleaning',
        'isComplete',
        'createdEmployee'
      ],
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
        'taskDescription': {
          bsonType: 'string'
        },
        'department': {
          bsonType: 'string'
        },
        'isCleaning': {
          bsonType: 'boolean'
        },
        'createdEmployee': {
          bsonType: 'string'
        },
        'createdAt': {
          bsonType: 'date'
        },
        'dueBy': {
          bsonType: 'date'
        },
        'isComplete': {
          bsonType: 'boolean'
        },
        'completedAt': {
          bsonType: 'date'
        },
        'completedEmployee': {
          bsonType: 'string'
        }
      }
    }
  }
});
