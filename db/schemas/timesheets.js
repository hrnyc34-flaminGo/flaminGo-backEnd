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
          bsonType: 'string',
        },
        'weekEnd': {
          bsonType: 'string',
        },
        'monday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'tuesday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'wednesday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'thursday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'friday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'saturday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'sunday': {
          bsonType: 'decimal',
          minimum: 0,
        },
        'weekHours': {
          bsonType: 'decimal',
        }
      }
    }
  }
});
