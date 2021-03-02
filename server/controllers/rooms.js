const Rooms = require('../../db/models/rooms.js');
const RoomTypes = require('../../db/models/roomTypes.js');
const Amenities = require('../../db/models/amenities.js');
const ObjectId = require('mongoose').Types.ObjectId;
const helpers = require('../helpers/index.js');
const { decimal128ToMoneyString } = require('../helpers/reformat');

module.exports = {
  getRooms: (req, res) => {
    let query = req.query;
    if ( query.isClean ) {
      query.isClean = helpers.reformat.strToBool( query.isClean );
    }
    if ( query.isOccupied ) {
      query.isOccupied = helpers.reformat.strToBool( query.isOccupied );
    }
    if ( query.floorNumber ) {
      query.floorNumber = parseInt( query.floorNumber );
    }

    Rooms.getRoomsInfo( query )
      .then(results => {
        results.map(room => {
          let newPrice = decimal128ToMoneyString( room.price );
          room.price = newPrice;
        });
        res.status( 200 ).json( results );
      })
      .catch(err => {
        console.error( err );
        res.sendStatus( 500 );
      });
  },

  getRoomById: (req, res) => {
    const { room_id } = req.params;
    let roomIdInfo = new ObjectId( room_id );

    Rooms.getRoomsInfo({ _id: roomIdInfo })
      .then(result => {
        let newPrice = decimal128ToMoneyString( result[0].price );
        result[0].price = newPrice;
        res.status( 200 ).json( result[0] );
      })
      .catch(err => {
        res.sendStatus( 500 );
      });
  },

  getTypes: (req, res) => {
    RoomTypes.readAll()
      .then(roomTypes => {
        let body = roomTypes.map(type => {
          let { _id, price, roomType } = type;
          let newPrice = decimal128ToMoneyString( price );
          return { _id, price: newPrice, roomType };
        });
        res.status( 200 ).json( body );
      })
      .catch(err => {
        res.sendStatus( 500 );
      });
  },

  getAmenity: (req, res) => {
    Amenities.readAll()
      .then(result => {
        res.status( 200 ).json( result );
      })
      .catch(err => {
        res.sendStatus( 500 );
      });
  },

  addNewRoom: (req, res) => {
    let updateInfo = req.body;

    RoomTypes.readOne( updateInfo.roomType )
      .then(result => {
        let roomTypeIdInfo = new ObjectId( result._id );
        updateInfo['roomType_id'] = roomTypeIdInfo;
        delete updateInfo.roomType;

        Rooms.createOne( updateInfo )
          .then(result => {
            res.sendStatus( 201 );
          })
          .catch(err => res.sendStatus( 404 ));
      })
      .catch(err => {
        res.sendStatus( 500 );
      });

  },

  addRoomType: (req, res) => {
    req.body.price = decimal128ToMoneyString( req.body.price );
    RoomTypes.createOne( req.body )
      .then(result => {
        res.sendStatus( 201 );
      })
      .catch(err => {
        res.sendStatus( 500 );
        console.log( err );
      });
  },

  addAmenity: (req, res) => {
    Amenities.create( req.body )
      .then(result => {
        res.sendStatus( 201 );
      })
      .catch(err => {
        res.sendStatus( 500 );
      });
  },

  updateRoomInfo: (req, res) => {
    const { room_id } = req.params;
    let updateInfo = req.body;
    let roomIdInfo = new ObjectId( room_id );
    updateInfo['_id'] = roomIdInfo;

    RoomTypes.readOne( updateInfo.roomType )
      .then(result => {
        updateInfo['roomType_id'] = new ObjectId( result._id );
        Rooms.update( updateInfo )
          .then(result => {
            res.sendStatus( 201 );
          });
      })
      .catch(err => {
        res.sendStatus( 500 );
      });
  }
};
