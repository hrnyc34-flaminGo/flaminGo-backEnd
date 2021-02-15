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
        'employee_id': {
          bsonType: 'objectId',
        },
        'weekStart': {
          bsonType: 'date',
        },
        'weekEnd': {
          bsonType: 'date',
        },
        'monday': {
          bsonType: 'int',
          minimum: 0,
        },
        'tuesday': {
          bsonType: 'int',
          minimum: 0,
        },
        'wednesday': {
          bsonType: 'int',
          minimum: 0,
        },
        'thursday': {
          bsonType: 'int',
          minimum: 0,
        },
        'friday': {
          bsonType: 'int',
          minimum: 0,
        },
        'saturday': {
          bsonType: 'int',
          minimum: 0,
        },
        'sunday': {
          bsonType: 'int',
          minimum: 0,
        },
      }
    }
  }
});
