const reformat = require('./reformat');
const Reservation = require('../../db/models/reservations');
const { Rooms } = require('../../db/models/rooms');


const formatReservation = (reservation) => {
  let bookingGuest = reformat.guestToName(reservation.bookingGuest);
  let guestList = reformat.guestListToNameList(reservation.guestList);
  let totalCost = reformat.decimal128ToMoneyString(reservation.totalCost);
  let checkIn = reformat.toDashDate(reservation.checkIn);
  let checkOut = reformat.toDashDate(reservation.checkOut);
  let { _id, room_id, roomNumber = '', roomType } = reservation;
  return {
    bookingGuest,
    guestList,
    totalCost,
    _id,
    room_id,
    roomNumber,
    roomType,
    checkIn,
    checkOut,
  };
};

// Given a day in YYYY-MM-DD format returns promise of how many of each
// roomtype is reserved for that day
const sumReservationsForDate = (dateStr) => {
  let pipeline = [
    {
      '$match': {
        '$expr': {
          '$and': [
            {
              '$lte': [
                '$checkIn', new Date(dateStr)
              ]
            }, {
              '$gte': [
                '$checkOut', new Date(dateStr)
              ]
            }
          ]
        }
      }
    }, {
      '$group': {
        '_id': '$roomType_id',
        'qty': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'roomtypes',
        'localField': '_id',
        'foreignField': '_id',
        'as': 'roomType'
      }
    }
  ];
  return Reservation.aggregate(pipeline);
};

const sumByRoomType = () => {
  let pipeline = [
    {
      '$group': {
        '_id': '$roomType_id',
        'qty': {
          '$sum': 1
        }
      }
    }, {
      '$lookup': {
        'from': 'roomtypes',
        'localField': '_id',
        'foreignField': '_id',
        'as': 'roomType'
      }
    }
  ];
  return Rooms.aggregate(pipeline);
};

module.exports = {
  formatReservation,
  sumReservationsForDate,
  sumByRoomType
};
