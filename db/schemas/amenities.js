db.createCollection('amenities', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'amenity'
      ],
      properties: {
        'amenity': {
          bsonType: 'string',
        },
      }
    }
  }
});
