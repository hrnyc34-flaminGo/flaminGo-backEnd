const Example = require('../../db/models/example.js');

module.exports = {
  get: (req, res) => {
    // GET /rooms Retrieves a list of rooms. By default all rooms are returned
    // GET /rooms/:room_id Retrieves a specific room by its id

    // [
    //   {
    //     "_id": "507c7f79bcf86cd7994f6c0e",
    //     "roomNumber": "110",
    //     "floorNumber": 1,
    //     "roomType": "Double Queen",
    //     "price": 150.00,
    //     "amenities": [
    //       "Non-Smoking"
    //     ],
    //     "isClean":true,
    //     "isOccupied": true,
    //     "isUsable": true,
    //     "currentGuests": [
    //       "Bobby Jr Palmer"
    //     ],
    //     "tasks": [
    //       {
    //         "_id":"5febcfb988e5d76e417427c6",
    //         "taskTitle": "Daily cleaning",
    //         "department":"Housekeeping"
    //       }
    //     ]
    //   }

    // GET /rooms/amenities Retrieves a list of all room amenities(Status: 200 OK)

    // [
    //   {
    //     "_id": "5ff90d07450a752b55cbf9fc",
    //     "amenity":"Fridge"
    //   },
    //   {
    //     "_id": "5ff90d07450a752b55cbf9fc",
    //     "amenity":"TV"
    //   },
    //   {
    //     "_id": "5ff90d07450a752b55cbf9fc",
    //     "amenity":"Handicapped Shower"
    //   },
    //   {
    //     "_id": "5ff90d07450a752b55cbf9fc",
    //     "amenity":"Non-Smoking"
    //   },
    //   ...
    // ]

    // GET /rooms/types Retrieves a list of all room types

    // [
    //   {
    //     "_id": "5ff8c7b6aa12892093205486",
    //     "roomType": "Single Queen",
    //     "price": 150.00,
    //   },
    //   {
    //     "_id": "5ff8c7b6aa12892093205486",
    //     "roomType": "Single King",
    //     "price": 200.00
    //   },
    //   {
    //     "_id": "5ff8c7b6aa12892093205486",
    //     "roomType": "Suite",
    //     "price": 400.00
    //   },
    //   {
    //     "_id": "5ff8c7b6aa12892093205486",
    //     "roomType": "Double Twin",
    //     "price": 100.00
    //   },
    //   ...
    // ]

  },
  post: (req, res) => {
    // POST /rooms Add a new room to the room list

    // {
    //   "_id": "507c7f79bcf86cd7994f6c0e",
    //   "roomNumber": "110",
    //   "floorNumber": 1,
    //   "roomType": "Double Queen",
    //   "price": 150.00,
    //   "amenities": [
    //     "Non-Smoking",
    //     "Pool Side",
    //     "Mini-Fridge"
    //   ]
    // }

  },
  put: (req, res) => {
    // PUT /rooms/:room_id

    // {
    //   "_id": "507c7f79bcf86cd7994f6c0e",
    //   "roomNumber": "110",
    //   "floorNumber": 1,
    //   "roomType": "Double Queen",
    //   "amenities": [
    //     "Non-Smoking",
    //     "Pool Side",
    //     "Mini-Fridge"
    //   ]
    // }
  },
  delete: (req, res) => {
  }
};