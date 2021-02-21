const reformat = require('./reformat');
const Reservation = require('../../db/models/reservations');
const { Rooms } = require('../../db/models/rooms');

/**
 * Because mongo query objects are immutable and the reservations should be
 * returned in a very specific format this function takes in the result of
 * a query to reservations and formats it to match what the front end is
 * expecting
 */
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

/**
 * Given check-in and check-out dates as strings in YYYY-MM-DD format returns
 * promise that resolves to an array of all occupied room types for the supplied
 * dates as well as a qty of rooms of that room type which are reserved for the
 * given dates
*/
const sumReservationsForDate = (checkIn, checkOut) => {
  let pipeline = [
    {
      '$match': {
        '$expr': {
          '$and': [
            {
              '$lte': [
                '$checkIn', new Date(checkIn)
              ]
            }, {
              '$gte': [
                '$checkOut', new Date(checkIn)
              ]
            }
          ]
        },
        '$expr': {
          '$and': [
            {
              '$lte': [
                '$checkIn', new Date(checkOut)
              ]
            }, {
              '$gte': [
                '$checkOut', new Date(checkOut)
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

/**
 * Return a promise that will resolve to an array of room types present
 * in the database.  Each room type object will have a qty property that
 * is the total number of room of that room type
 */
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

/**
 * Given two strings that resolve to valid dates will return the number
 * of nights between the dates.
 */
const calculateNights = (checkIn, checkOut) => {
  // todo: function used more than once refactor to be helper function
  let nights = Math.abs(new Date (checkOut) - new Date(checkIn));
  nights = nights / (1000 * 3600 * 24);
  return nights;
};

module.exports = {
  formatReservation,
  sumReservationsForDate,
  sumByRoomType,
  calculateNights,
};
