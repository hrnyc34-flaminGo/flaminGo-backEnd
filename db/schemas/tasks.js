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
      ],
      properties: {
        'room_id': {
          bsonType: ['objectId', 'string'],
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
        'employeeCreated_id': {
          bsonType: 'string'
        },
        'createdAt': {
          bsonType: ['date', 'string']
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
        },
        'employeeCompleted_id': {
          bsonType: 'string'
        },
        'employeeAssigned': {
          bsonType: 'string'
        },
        'employeeAssigned_id': {
          bsonType: 'string'
        }
      }
    }
  }
});
