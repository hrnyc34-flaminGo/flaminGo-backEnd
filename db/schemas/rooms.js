conn = new Mongo();
db = conn.getDB('flaminGo');

db.createCollection('rooms', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'roomType_id',
        'roomNumber',
        'isClean',
        'isOccupied',
        'isUsable'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        'reservation_id': {
          bsonType: ['objectId', 'string']
        },
        'roomType_id': {
          bsonType: 'objectId'
        },
        'roomNumber': {
          bsonType: 'string'
        },
        'floorNumber': {
          bsonType: 'int'
        },
        'isClean': {
          bsonType: 'bool',
        },
        'isOccupied': {
          bsonType: 'bool'
        },
        'isUsable': {
          bsonType: 'bool'
        }
      }
    }
  }
});
