const ObjectId = require('mongoose').Types.ObjectId;

const roomsMethod = require('../../db/models/rooms.js');
const roomTypeMethod = require('../../db/models/roomTypes.js');
const amenitiesMethod = require('../../db/models/amenities.js');

module.exports = {
  get: (req, res) => {
    // GET /rooms Retrieves a list of rooms. By default all rooms are returned
    // GET /rooms/:room_id Retrieves a specific room by its id
    // GET /rooms/amenities Retrieves a list of all room amenities(Status: 200 OK)
    // GET /rooms/types Retrieves a list of all room types
    if (req.url === '/') {
      roomsMethod.readAll()
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    } else if (req.url === '/amenities') {
      amenitiesMethod.readAll()
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });

    } else if (req.url === '/types') {
      roomTypeMethod.readAll()
        .then(result => {
          res.status(200).json(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  },
  post: (req, res) => {
    console.log('req.url:', req.url);
    let updateInfo = req.body;
    // POST /rooms Add a new room to the room list
    if (req.url === '/') {
      roomTypeMethod.readOne(updateInfo.roomType)
        .then(result => {
          updateInfo['price'] = result.price;
          updateInfo['amenities'] = result.amenities;
          roomsMethod.update(updateInfo)
            .then(result => {
              res.sendStatus(201);
            });
        })
        .catch(err => {
          res.sendStatus(500);
        });
    } else if (req.url === '/amenities') {
      amenitiesMethod.create(updateInfo)
        .then(result => {
          res.sendStatus(201);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    } else if (req.url === '/types') {
      roomTypeMethod.update(updateInfo)
        .then(result => {
          res.sendStatus(201);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  },
  put: (req, res) => {
    // PUT /rooms/:room_id
    const { room_id } = req.params;
    let roomIdInfo = new ObjectId(room_id);
    let updateInfo = req.body;
    roomTypeMethod.readOne(updateInfo.roomType)
      .then(result => {
        updateInfo['_id'] = roomIdInfo;
        updateInfo['price'] = result.price;
        updateInfo['amenities'] = result.amenities;
        roomsMethod.update(updateInfo)
          .then(result => {
            res.sendStatus(201);
          });
      })
      .catch(err => {
        res.sendStatus(500);
      });

  },
  delete: (req, res) => {

  }
};