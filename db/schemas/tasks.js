db.createCollection('tasks', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'location',
        'taskTitle',
        'department',
        'createdAt',
        'isComplete',
        'createdEmployee'
      ],
      properties: {
        'room_id': {
          bsonType: ['objectId', 'null'],
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
          bsonType: 'bool'
        },
        'employeeCreated': {
          bsonType: 'string'
        },
        'createdAt': {
          bsonType: 'date'
        },
        'dueBy': {
          bsonType: ['date', 'string']
        },
        'isComplete': {
          bsonType: 'bool'
        },
        'completedAt': {
          bsonType: ['date', 'string']
        },
        'employeeCompleted': {
          bsonType: 'string'
        }
      }
    }
  }
});
