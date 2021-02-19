const Reservation = require('../../db/models/reservations');
const { ObjectId } = require('mongoose').Types;
const { RoomTypes } = require('../../db/models/roomTypes');
const { Rooms } = require('../../db/models/rooms');
const Task = require('../../db/models/Task');
const helpers = require('../helpers/index.js');

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
      helpers.makeQuery.searchText(firstName, lastName),
      helpers.makeQuery.checkInDate(checkIn),
      helpers.makeQuery.checkOutDate(checkOut),
      reservation_id.length < 24
        ? helpers.makeQuery.regex('idString', reservation_id)
        : { _id: ObjectId(reservation_id) }
    );

    Reservation.searchReservations(query)
      .then((result) => {
        let body = result.map(helpers.reservations.formatReservation);
        res.status(200).send(body);
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  },
  getAvailibility: async (req, res) => {
    // Search for rooms available on the date
    let { date } = req.params;
    try {
      // Get booked rooms by type on input day
      let bookedRooms = await helpers.reservations.sumReservationsForDate(date);
      // Get total number of rooms by type
      let hotelRooms = await helpers.reservations.sumByRoomType();

      // reformat to match API output
      hotelRooms = hotelRooms.reduce(( acc, el ) => {
        let roomType = {};
        roomType[el._id.toString()] = {
          // _id: el._id.toString(),
          qty: el.qty,
          price: helpers.reformat.decimal128ToMoneyString(el.roomType[0].price),
          name: el.roomType[0].roomType,
          amenities: el.roomType[0].amenities
        };
        return Object.assign(acc, roomType);
      }, {});
      // Subtract booked rooms from total hotel rooms
      for (const roomType of bookedRooms) {
        let id = roomType._id.toString();
        if (hotelRooms.hasOwnProperty(id)) {
          let qty = hotelRooms[id].qty;
          qty = Math.max(qty - roomType.qty, 0);
          hotelRooms[id].qty = qty;
        }
      }
      // Convert to array
      let results = [];
      for (const key in hotelRooms) {
        results.push(hotelRooms[key]);
      }
      res.status(200).json({ date, results });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
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
      let room = await await Rooms.findOne({_id: room_id});
      let reservation = await Reservation.findOne({_id: reservation_id});
      // Modify room document
      room.reservation_id = ObjectId(reservation_id);
      room.isOccupied = true;
      room.currentGuests = reservation.guestList;

      // Modify reservation document
      reservation.room_id = room._id;
      reservation.roomNumber = room.roomNumber;

      // Save modified documents
      await room.save();
      await reservation.save();

      res.sendStatus(201);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },
  checkOut: async (req, res) => {
    let { reservation_id } = req.params;
    try {
      let reservation = await Reservation.findOne({_id: reservation_id}).exec();
      let { room_id } = reservation;
      if (!room_id) { throw Error('Reservation not checked in.'); }

      // get room
      let room = await Rooms.findOne({_id: room_id});
      if (!room) { throw Error('No room found, bad room id in reservation'); }

      // check this reservation matches room reservation
      if (room.reservation_id.toString() !== reservation_id) {
        throw Error('Reservation is not currently checked in');
      }

      // get roomType
      let roomTypeObj = await RoomTypes.findOne({_id: room.roomType_id});
      let roomType = roomTypeObj.roomType;

      // Update room
      room.reservation_id = '';
      room.isOccupied = false;

      // Search for open cleaning task
      let tasks = await Task.find({ room_id, isCleaning: true, isComplete: false }).exec();

      // If there are no open cleaning tasks
      if (tasks.length === 0) {
        room.isClean = false;
        let newTask = await helpers.tasks.newCleaningTask(null, room._id);
      }

      await room.save();

      // return data
      let {_id, bookingGuest, checkIn, checkOut, guestList} = reservation;
      let {roomNumber} = room;
      let totalCost = helpers.reformat.decimal128ToMoneyString(reservation.totalCost);
      let body = {
        _id,
        bookingGuest,
        checkIn,
        checkOut,
        guestList,
        totalCost,
        roomNumber,
        roomType
      };

      res.status(200).json(body);
    } catch (error) {
      console.log(error);
      res.status(404).send(error.message);
    }
  },
};
