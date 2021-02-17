const db = require('../../db/index');
const Reservation = require('../../db/models/reservations');
const reformat = require('../helpers/reformat');
const makeQuery = require('../helpers/makeQuery');
const { ObjectId } = require('mongoose').Types;

//todo: This could maybe get moved to a helper file.
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

module.exports = {
  get: (req, res) => {
    let {
      firstName = '',
      lastName = '',
      checkIn = '',
      checkOut = '',
      reservation_id = '',
    } = req.query;

    const query = {};
    Object.assign(
      query,
      makeQuery.searchText(firstName, lastName),
      makeQuery.checkInDate(checkIn),
      makeQuery.checkOutDate(checkOut),
      reservation_id.length < 24
        ? makeQuery.regex('idString', reservation_id)
        : { _id: ObjectId(reservation_id) }
    );

    Reservation.searchReservations(query)
      .then((result) => {
        let body = result.map(formatReservation);
        res.status(200).send(body);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },

  post: (req, res) => {},
  checkIn: async (req, res) => {
    let {reservation_id} = req.params;
    let { room_id = '' } = req.body;
    // Start a new session and transaction
    const session = await db.startSession();
    session.startTransaction();
    // Add reservation_id to room
    // Add room_id to reservation

    res.status(200).send();
  },
  delete: (req, res) => {},
};
