var ObjectId = require('mongoose').Types.ObjectId;

const roomsMethod = require('../../db/models/rooms.js');
const amenitiesMethod = require('../../db/models/amenities.js');
const roomTypeMethod = require('../../db/models/roomTypes.js');

module.exports = {
  get: (req, res) => {
    if (req.url === '/') {
      const { room_id } = req.params;
      let getRoomId = new ObjectId(room_id);
      if (!room_id) {
        roomsMethod.read()
          .then(result => res.status(200).json(result))
          .catch(err => {
            res.sendStatus(404);
            console.log('GET /rooms', err);
          });
      } else {
        // roomsMethod.readOne(getRoomId)
        //   .then(result => res.status(200).json(result))
        //   .catch(err => {
        //     res.sendStatus(404);
        //     console.log('GET /rooms/:rood_id', err);
        //   });
      }
    } else if (req.url === '/amenities') {
      amenitiesMethod.readAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
          res.sendStatus(404);
          console.log('GET_ /rooms/amenities_error', err);
        });

    } else if (req.url === '/types') {
      roomTypeMethod.readAll()
        .then(result => res.status(200).json(result))
        .catch(err => {
          res.sendStatus(404);
          console.log('GET_ /rooms/types_error', err);
        });
    }

  },
  post: (req, res) => {

    if (req.url === '/') {
      let roomInfo = req.body;

      roomTypeMethod.readOne(req.body.roomType)
        .then(result => {
          roomInfo['price'] = result.price;
          roomInfo['amenities'] = result.amenities;
          // ADD tasks

          roomsMethod.update(roomInfo)
            .then((result) => {
              res.sendStatus(201);
            });
        })
        .catch((err) => {
          res.sendStatus(404);
          console.error('POST /rooms Add ERROR', err);
        });

    } else if (req.url === '/amenities') {
      amenitiesMethod.create(req.body.amenity)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.sendStatus(404);
          console.error('PUT_ /rooms/amenities_Error', err);
        });

    } else if (req.url === '/types') {
      roomTypeMethod.update(req.body)
        .then((result) => {
          res.sendStatus(201);
        })
        .catch((err) => {
          res.sendStatus(404);
          console.error('PUT_ /rooms/types_Error', err);
        });
    }
  },
  put: (req, res) => {
    console.log('req.params', req.params);
    console.log('req.body', req.body);
    const { room_id } = req.params;
    let roomInfo = req.body;
    roomInfo['_id'] = new ObjectId(room_id);

    roomTypeMethod.readOne(req.body.roomType)
      .then(result => {
        roomInfo['price'] = result.price;
        roomInfo['amenities'] = result.amenities;
        // ADD tasks HERE
        roomsMethod.update(roomInfo)
          .then((result) => {
            res.sendStatus(201);
          });
      })
      .catch((err) => {
        res.sendStatus(404);
        console.error('PUT /rooms Edit ERROR', err);
      });
  },
  delete: (req, res) => {
  }
};