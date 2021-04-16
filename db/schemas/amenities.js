db.createCollection('amenities', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'amenity'
      ],
      properties: {
        _id: {
          bsonType: 'objectId'
        },
        'amenity': {
          bsonType: 'string',
        },
      }
    }
  }
});
