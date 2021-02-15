db.createCollection('employees', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [],
      properties: {
        'firstName': {
          bsonType: 'string',
        },
        'lastName': {
          bsonType: 'string'
        },
        'address1': {
          bsonType: 'string'
        },
        'address2': {
          bsonType: 'string'
        },
        'city': {
          bsonType: 'string'
        },
        'state': {
          bsonType: 'string'
        },
        'zipcode': {
          bsonType: 'string'
        },
        'wage': {
          bsonType: 'decimal'
        },
        'startDate': {
          bsonType: 'date'
        },
        'username': {
          bsonType: 'string'
        },
        'passwordHash': {
          bsonType: 'string'
        },
        'needsNewPassword': {
          bsonType: 'boolean'
        },
        'salt': {
          bsonType: 'string'
        },
        'position': {
          bsonType: 'string'
        },
        'isActive': {
          bsonType: 'boolean'
        }
      }
    }
  }
});
