const mongoose = require('mongoose');
const { Schema, Types, Mixed } = mongoose;
const db = require('../../db');
const RoomTypes = require('./roomTypes.js');

const roomsSchema = new Schema({
  reservation_id: { type: Mixed, default: '' },
  roomType_id: { type: Types.ObjectId, ref: 'RoomTypes' },
  roomNumber: { type: String, unique: true },
  floorNumber: { type: Number },
  isClean: { type: Boolean, default: true },
  isOccupied: { type: Boolean, default: false },
  isUsable: { type: Boolean, default: true },
}, {
  versionKey: false
});

roomsSchema.statics.searchRooms = function (input = {}) {
  let { roomType = {}, ...query } = input;
  if (typeof roomType === 'string') {
    roomType = {
      'roomTypeObj': {
        '$elemMatch': {
          'roomType': roomType
        }
      }
    };
  }
  let pipeline = [
    {
      '$match': query
    }, {
      '$lookup': {
        'from': 'roomtypes',
        'localField': 'roomType_id',
        'foreignField': '_id',
        'as': 'roomTypeObj'
      }
    },
    { '$match': roomType },
    {
      '$lookup': {
        'from': 'tasks',
        'let': {
          'id': '$_id'
        },
        'pipeline': [
          {
            '$match': {
              'isComplete': false,
              '$expr': {
                '$eq': [
                  '$room_id', '$$id'
                ]
              }
            }
          }
        ],
        'as': 'tasks'
      }
    }, {
      '$lookup': {
        'from': 'reservations',
        'localField': 'reservation_id',
        'foreignField': '_id',
        'as': 'reservation'
      }
    }, {
      '$set': {
        'roomTypeObj': {
          '$arrayElemAt': [
            '$roomTypeObj', 0
          ]
        },
        'reservation': {
          '$arrayElemAt': [
            '$reservation', 0
          ]
        }
      }
    }, {
      '$set': {
        'roomType': '$roomTypeObj.roomType',
        'price': { '$toString': '$roomTypeObj.price' },
        'amenities': '$roomTypeObj.amenities',
        'currentGuests': '$reservation.guestList'
      }
    }, {
      '$project': {
        'roomTypeObj': 0,
        'reservation': 0
      }
    }
  ];

  return this.aggregate(pipeline).sort({ roomNumber: 1 }).exec();
};

roomsSchema.statics.getRoomsById = function (query = {}) {
  const pipeline =
  [
    {
      '$match': query
    },
    {
      $lookup: {
        from: 'roomtypes',
        localField: 'roomType_id',
        foreignField: '_id',
        as: 'add'
      }
    }, { $replaceRoot: { newRoot: { $mergeObjects: [{ $arrayElemAt: ['$add', 0] }, '$$ROOT'] } } }, {
      $project: {
        isClean: 0,
        isOccupied: 0
      }
    }, {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'room_id',
        as: 'task'
      }
    }, {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{
            $arrayElemAt: ['$task', 0]
          }, '$$ROOT']
        }
      }
    }, {
      $addFields: {
        isClean: '$isComplete'
      }
    }, {
      $lookup: {
        from: 'reservations',
        localField: '_id',
        foreignField: 'room_id',
        as: 'currentGuest'
      }
    }, {
      $replaceRoot: {
        newRoot: {
          $mergeObjects: [{
            $arrayElemAt: ['$currentGuest', 0]
          }, '$$ROOT']
        }
      }
    }, {
      $lookup: {
        from: 'tasks',
        localField: '_id',
        foreignField: 'room_id',
        as: 'tasks'
      }
    }, {
      $project: {
        roomType_id: 1,
        currentGuests: {
          $cond: {
            if: { $eq: ['', '$reservation_id'] },
            then: [],
            else: '$guestList'
          }
        },
        reservation_id: {
          $cond: {
            if: { $eq: ['null', '$reservation_id'] },
            then: '',
            else: '$reservation_id'
          }
        },
        roomNumber: 1,
        floorNumber: 1,
        roomType: 1,
        price: 1,
        amenities: 1,
        isOccupied: {
          $cond: {
            if: { $eq: ['', '$reservation_id'] },
            then: false,
            else: true
          }
        },
        isClean: {
          $cond: {
            if: { $eq: [false, '$isClean'] },
            then: '$isClean',
            else: true
          }
        },
        isUsable: 1,
        tasks: 1,
      }
    }];
  return this.aggregate(pipeline).sort({ roomNumber: 1 }).exec();
};


module.exports = {
  Rooms: mongoose.model('Rooms', roomsSchema),

  roomsMethod: {
    readOne: (query = { _id: id }) => {
      return module.exports.Rooms.findOne({ query }).exec();
    },
    create: (one) => {
      return module.exports.Rooms.create(
        {
          reservation_id: one.reservations_id,
          roomType_id: one.roomType_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          isClean: one.isClean,
          isOccupied: one.isOccupied,
          isUsable: one.isUsable,
        }
      );
    },
    update: (one) => {
      return module.exports.Rooms.updateMany(
        { _id: one._id },
        {
          reservation_id: one.reservations_id,
          roomType_id: one.roomType_id,
          floorNumber: one.floorNumber,
          roomNumber: one.roomNumber,
          isClean: one.isClean,
          isOccupied: one.isOccupied,
          isUsable: one.isUsable,
        },
        { upsert: true }
      );
    },
    deleteOne: (type) => {
      return module.exports.Rooms.deleteOne({ roomType: type });
    },
  }
};
