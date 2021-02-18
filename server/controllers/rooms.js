const ObjectId = require('mongoose').Types.ObjectId;

const { roomsMethod, Rooms } = require('../../db/models/rooms.js');
const { roomTypeMethod } = require('../../db/models/roomTypes.js');
const amenitiesMethod = require('../../db/models/amenities.js');
const { decimal128ToMoneyString } = require('../helpers/reformat');

module.exports = {
  get: (req, res) => {
    if (req.url === '/') {

      Rooms.getRooms()
        .then(result => {
          // need to fix decimalNum problem here
          res.status(200).json(result);
        })
        .catch(err => {
          res.sendStatus(500);
        });

    } else if (req.params && req.url !== '/amenities' && req.url !== '/types') {
      const { room_id } = req.params;
      let roomIdInfo = new ObjectId(room_id);

      Rooms.getRooms({_id: roomIdInfo})
        .then(result => {
          // need to fix decimalNum problem here
          res.status(200).json(result[0]);
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
        .then(roomTypes => {
          let body = roomTypes.map((type) => {
            let { _id, price, roomType } = type;
            let newPrice = decimal128ToMoneyString(price);
            return { _id, price: newPrice, roomType };
          });
          res.status(200).json(body);
        })
        .catch(err => {
          res.sendStatus(500);
        });
    }
  },
  post: (req, res) => {
    let updateInfo = req.body;
    if (req.url === '/') {
      roomTypeMethod.readOne(updateInfo.roomType)
        .then(result => {
          let roomTypeIdInfo = new ObjectId(result._id);
          updateInfo['roomType_id'] = roomTypeIdInfo;
          delete updateInfo.roomType;
          console.log('updateInfo:', updateInfo);

          roomsMethod.create(updateInfo)
            .then(result => {
              res.sendStatus(201);
            })
            .catch(err => res.sendStatus(404));
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
          console.log(err);
        });
    }
  },
  put: (req, res) => {
    const { room_id } = req.params;
    let updateInfo = req.body;
    let roomIdInfo = new ObjectId(room_id);
    updateInfo['_id'] = roomIdInfo;
    console.log('updateInfo:', updateInfo);

    roomsMethod.update(updateInfo)
      .then(result => {
        res.sendStatus(201);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },
  delete: (req, res) => {
  }
};