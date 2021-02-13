<!-- Table template
| Parameter | Type | Description |
| ---------- | ---- | ----------- |
|  |  |  | -->

# Flamingo API

## Room Routes
### List Rooms
`GET /rooms` Retrives a list of all rooms

Response   
`Status: 200 OK`

```
[All the room objects]
```
### Add A Room
`POST /rooms` Add a new room to the room list

Body Parameters

| Parameter | Type | Description |
| ---------- | ---- | ----------- |
| roomNumber | string | String of room number |
| floorNumber | number | [Optional] Floor number |
| roomType | string | Room type of new room |
| amenities | array | [Optional] Array with room amenities |

Response   
`Status: 200 OK`

```
{newly created room if possible?}
```

### Edit A Room
`PUT /rooms/:roomId` Edit a specific room

Body Parameters

| Parameter | Type | Description |
| ---------- | ---- | ----------- |
| roomNumber | string | [Optional] String of room number |
| floorNumber | number | [Optional] Floor number |
| roomType | string | [Optional] Room type of new room |
| amenities | array | [Optional] Array with room amenities (Will completely overide the old array of amenities) |

Response   
`Status: 201 Created`

### Get Specific Room
`GET /rooms/:roomId` Retrives a specific room by its id

| Parameters | Type | Description |
| ---------- | ---- | ----------- |
| roomId    | string| String matching the mongo _id field |

Response   
`Status: 200 OK`

```
{}
```
### List Amenities
`GET /rooms/amenities` Retrives a list of all room amenities.

Response   
 `Status: 200 OK`

```
[]
```

### List Room Types
`Get /rooms/types` Retrives a list of all room types

Response   
`Status: 200 OK`

```
[]
```

## Reservation Routes
### Inquire Room Availability
`GET /reservations/availability/:date` Will return the quantity of available rooms on the supplied date, broken down by room type.

Response:  
`Status: 200 OK`

| Parameter | Type | Description |
| ---------- | ---- | ----------- |
| date | string | Date of inquirery as a string in the format "MM/DD/YYYY" |

```
{Response body}
```

### List Reservations
`GET /reservations` Will return a list of reservations matching the search criteria.  By default it will return any reservations that are checking in/out today.

Response  
`Status: 200 OK`

| Parameter | Type | Description |
| ---------- | ---- | ----------- |
|  |  |  |

## Task Routes

## Employee Routes
