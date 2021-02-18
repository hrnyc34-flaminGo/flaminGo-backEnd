const Reservation = require('../../db/models/reservations');
const reformat = require('../helpers/reformat');
const makeQuery = require('../helpers/makeQuery');
const { ObjectId } = require('mongoose').Types;
const { RoomTypes } = require('../../db/models/roomTypes');
const { Rooms } = require('../../db/models/rooms');

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
  getAvailibility: (req, res) => {
    res.send({
      'date': '2021-11-10',
      'results': [
        {
          'name': 'Single Queen',
          'qty': 10,
          'price': '150.00'
        },
        {
          'name': 'Double Queen',
          'qty': 7,
          'price': '225.00'
        }
      ]
    }).status(200);
  },

  post: (req, res) => {
    let { roomType, checkIn, checkOut, guestList, bookingGuest } = req.body;
    let nights = new Date (checkOut) - new Date(checkIn);
    nights = nights / (1000 * 3600 * 24);
    // Get roomtype id
    RoomTypes.findOne({roomType})
      .then((roomType) => {
        // Calculate total cost
        let price = roomType.price;
        let totalCost = price * nights;
        // create id and set idString
        let _id = new ObjectId();
        let idString = _id.toString();
        let newRes = new Reservation({
          _id,
          idString,
          bookingGuest,
          guestList,
          checkIn,
          checkOut,
          totalCost,
          roomType_id: roomType._id
        });
        return newRes.save();
      })
      .then((result) => {
        res.sendStatus(201);
      })
      .catch(err => {
        res.sendStatus(500);
      });
  },
  checkIn: async (req, res) => {
    let { room_id } = req.body;
    let { reservation_id } = req.params;
    try {
      let room = await Rooms.findOne({_id: room_id});
      let reservation = await Reservation.findOne({_id: reservation_id});
      room.reservation_id = reservation_id;
      debugger;
      let result = await room.save();
      debugger;
      res.sendStatus(201);
    } catch (error) {
      debugger;
      console.log(error);
      res.sendStatus(500);
    }
  },
  checkOut: (req, res) => {
    // need to return dummy data
    res.send({
      '_id': '60108729ffefc9bae107564c',
      'bookingGuest': {
        'firstName': 'Adam',
        'lastName': 'Pollock',
        'phone': '540-771-6242',
        'email': 'AdamDPollock@teleworm.us'
      },
      'roomNumber': '110',
      'roomType': 'Single Queen',
      'totalCost': '1050.00',
      'checkIn': '2021-05-03T13:44:00.000Z',
      'checkOut': '2021-05-10T13:44:00.000Z',
      'guestList': [
        {
          'firstName': 'Guest',
          'lastName': 'One',
          'phone': '123-456-7890',
          'email': 'guestOne@madeup.com'
        }
      ]
    }).status(200);
  },
};
