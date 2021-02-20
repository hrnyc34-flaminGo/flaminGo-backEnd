db.createCollection('timesheets', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'employee_id',
        'weekStart',
        'weekEnd',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        'employee_id': {
          bsonType: 'string',
        },
        'weekStart': {
          bsonType: 'string',
        },
        'weekEnd': {
          bsonType: 'string',
        },
        'monday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'tuesday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'wednesday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'thursday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'friday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'saturday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'sunday': {
          bsonType: ['decimal', 'int', 'double'],
          minimum: 0,
        },
        'weekHours': {
          bsonType: ['decimal', 'int', 'double'],
        }
      }
    }
  }
});
