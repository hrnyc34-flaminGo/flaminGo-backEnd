const Reservation = require('../../db/models/reservations');
const reformat = require('../helpers/reformat');

const formatReservation = (reservation) => {
  let bookingGuest = reformat.guestToName(reservation.bookingGuest);
  let guestList = reformat.guestListToNameList(reservation.guestList);
  let totalCost = reformat.decimal128ToFloat(reservation.totalCost);
  let checkIn = reformat.toDashDate(reservation.checkIn);
  let checkOut = reformat.toDashDate(reservation.checkOut);
  let {_id, room_id, roomNumber = "", roomType} = reservation;
  return {
    bookingGuest,
    guestList,
    totalCost,
    _id,
    room_id,
    roomNumber,
    roomType,
    checkIn,
    checkOut
  };
};

module.exports = {
  get: (req, res) => {
    // Reservation.find().sort({checkIn: -1})
    //   .then((result) => {
    //     let body = result.map(formatReservation);
    //     res.status(200).send(body);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     res.sendStatus(500);
    //   });
    Reservation.searchReservations()
      .then((result) => {
        let body = result.map(formatReservation);
        res.status(200).send(body);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  post: (req, res) => {

  },
  put: (req, res) => {

  },
  delete: (req, res) => {

  }
};
