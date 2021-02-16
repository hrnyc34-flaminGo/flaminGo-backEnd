# Flamingo API

## Table of Contents

- [Login](#login)

  - [Authenticate User](#authenticate-user)
  
  - [Validate Token](#validate-token)

- [Rooms](#rooms)

  - [List Rooms](#list-rooms)
  
  - [Add A Room](#add-a-room)
  
  - [Edit A Room](#edit-a-room)
  
  - [Get Specific Room](#get-specific-room)
  
  - [List Amenities](#list-amenities)
  
  - [List Room Types](#list-room-types)

- [Reservations](#reservations)

  - [Inquire Room Availability](#inquire-room-availability)
  
  - [List Reservations](#list-reservations)
  
  - [Add New REservation](#add-new-reservation)
  
  - [Check-In A Reservation](#check-in-a-reservation)
  
  - [Check-Out A Reservation](#check-out-a-reservation)
  

- [Tasks](#tasks)

  - [List Tasks](#list-tasks)
  
  - [Add New Task](#add-new-task)
  
  - [Edit Task](#edit-task)

- [Employees](#employees)

  - [List Employees](#list-employees)
  
  - [Get Specific Employee](#get-specific-employee)
  
  - [Add New Employee](#add-new-employee)
  
  - [Edit Employee](#edit-employee)
  
- [Timesheets](#timesheets)

  - [Get Employee's Timesheet](#get-employee's-timesheet)
  
  - [Edit A Timesheet](#edit-a-timesheet)
  
## Login

### Authenticate User
`POST /employees/authenticate-user`  Sends User Information

Response

`Status: 200 OK`

Bad Request Response
`Status: 400 BAD_REQUEST`

Internal Server Error Response
`Status: 500 INTERNAL_SERVER_ERROR`

Parameters
| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| username | string | body | String of username |
| password | string | body | String of hashed password |

```JSON
{TBD}
```

### Validate Token
`GET /employees/validate-token`

Response

`Status: 200 OK`

Unauthorized Response
`Status: 401 UNAUTHORIZED`

Parameters :
| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| username | string | ? | String of username |

```JSON
{ "user": {req.user(TBD)} }
```

## Rooms
### List Rooms
`GET /rooms` Retrieves a list of rooms. By default all rooms are returned

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| roomnumber | string | query | [Optional] Room number |
| floornumber | number | query | [Optional] Floor number |
| roomType | string | query | [Optional] Room type |
| isClean | boolean | query | [Optional] Current cleanliness status of room |
| isOccupied | boolean | query | [Optional] Current occupancy status of room |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*

Response

`Status: 200 OK`

```JSON
[
  {
    "_id": "507c7f79bcf86cd7994f6c0e",
    "roomNumber": "110",
    "floorNumber": 1,
    "roomType": "Double Queen",
    "amenities": [
      "Non-Smoking",
      "Pool Side",
      "Mini-Fridge"
    ],
    "isClean":true,
    "isOccupied": true,
    "currentGuests": [
      "Bob Palmer",
      "Alice Palmer",
      "Bobby Jr Palmer"
    ],
    "tasks": [
      {
        "_id":"5febcfb988e5d76e417427c6",
        "taskTitle": "Daily cleaning",
        "department":"Housekeeping"
      },
      {
        "_id":"5febcfc488e5d76e417427c7",
        "taskTitle": "Shower needs new caulk",
        "department":"Maintenance"
      },
      ...
    ]
  }, 
  {
    "_id": "507c7f79bcf86cd7494f6a9b",
    "roomNumber": "111",
    ...
  },
  ...
]
```

### Add A Room
`POST /rooms` Add a new room to the room list

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| roomnumber | string | body | String of room number |
| floornumber | number | body | [Optional] Floor number |
| roomType | string | body | Room type of new room |
| amenities | array | body | [Optional] Array with room amenities |

Response

`Status: 201 CREATED`

```JSON
{
  "_id": "507c7f79bcf86cd7994f6c0e",
  "roomNumber": "110",
  "floorNumber": 1,
  "roomType": "Double Queen",
  "price": 150.00,
  "amenities": [
    "Non-Smoking",
    "Pool Side",
    "Mini-Fridge"
  ]
}
```

### Edit A Room
`PUT /rooms/:room_id` Edit a specific room

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| :room_id | string | path | String representation of mongo _id |
| roomnumber | string | body | [Optional] String of room number |  |
| floornumber | number | body | [Optional] Floor number |  |
| roomType | string | body | [Optional] Room type of new room |
| amenities | array | body | [Optional] Array with room amenities (Will completely override the old array of amenities) |

Response

`Status: 201 CREATED`

```JSON
{
  "_id": "507c7f79bcf86cd7994f6c0e",
  "roomNumber": "110",
  "floorNumber": 1,
  "roomType": "Double Queen",
  "amenities": [
    "Non-Smoking",
    "Pool Side",
    "Mini-Fridge"
  ]
}
```

### Get Specific Room
`GET /rooms/:room_id` Retrieves a specific room by its id

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| room_id | string | path | String matching the mongo _id field |

Response

`Status: 200 OK`

```JSON
{
  "_id": "507c7f79bcf86cd7994f6c0e",
  "roomNumber": "110",
  "floorNumber": 1,
  "roomType": "Double Queen",
  "amenities": [
    "Non-Smoking",
    "Pool Side",
    "Mini-Fridge"
  ],
  "isClean":true,
  "isOccupied": true,
  "currentGuests": [
    "Bob Palmer",
    "Alice Palmer",
    "Bobby Jr Palmer"
  ],
  "tasks": [
    {
      "_id":"5febcfb988e5d76e417427c6",
      "taskDescription": "Daily cleaning",
      "department":"Housekeeping"
    },
    {
      "_id":"5febcfc488e5d76e417427c7",
      "taskDescription": "Shower needs new caulk",
      "department":"Maintenance"
    },
    ...
  ]
},
```
### List Amenities
`GET /rooms/amenities` Retrieves a list of all room amenities.

Response

 `Status: 200 OK`

```JSON
[
  { 
    "_id": "5ff90d07450a752b55cbf9fc",
    "amenity":"Fridge"
  },
  { 
    "_id": "5ff90d07450a752b55cbf9fc",
    "amenity":"TV"
  },
  { 
    "_id": "5ff90d07450a752b55cbf9fc",
    "amenity":"Handicapped Shower"
  },
  { 
    "_id": "5ff90d07450a752b55cbf9fc",
    "amenity":"Non-Smoking"
  },
  ...
]
```

### List Room Types
`GET /rooms/types` Retrieves a list of all room types

Response

`Status: 200 OK`

```JSON
[
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Single Queen",
    "price": 150.00
  },
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Single King",
    "price": 200.00
  },
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Suite",
    "price": 400.00
  },
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Double Twin",
    "price": 100.00
  },
  ...
]

```

## Reservations

### Inquire Room Availability
`GET /reservations/availability/:date` Will return the quantity of available rooms on the supplied date, broken down by room type.

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| :date | string | path | Date of inquirery as a string in the format "YYYY-MM-DD" |

Response:

`Status: 200 OK`

```JSON
{
  "date": "2021-11-10",
  "results": [
    {
      "name": "Single Queen",
      "qty": 10,
      "price": 150.00
    },
    {
      "name": "Double Queen",
      "qty": 7,
      "price": 225.00
    },
    ...
  ]
}
```

### List Reservations
`GET /reservations` Will return a list of reservations matching the search criteria.  By default it will return any reservations that are checking in/out today.

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| firstName | string | query | [Optional] First name of someone on the reservation|
| lastName | string | query | [Optional] Last name of someone on the reservation |
| checkIn | string | query | [Optional] String representation of date in YYYY-MM-DD format |
| checkOut | string | query | [Optional] String representation of date in YYYY-MM-DD format |
| reservation_id | string | query | [Optional] String representation of reservation's mongo _id field. (Can be partial id) |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*

Response

`Status: 200 OK`

```JSON
[
  {
    "_id": "5ffa25a6a13f985fdeda9e70",
    "bookingGuest": "John Smith",
    "roomNumber": "",
    "roomType": "Single Queen",
    "totalCost": 150.00,
    "checkIn": "2021-10-22",
    "checkOut": "2021-10-28",
    "guestList": [
      "Jane Smith",
      "Richard Long"
    ]
  },
  {
    "_id": "60108729ffefc9bae107564c",
    "bookingGuest": "Soo Yung",
    "roomNumber": "110",
    "roomType": "Single Queen",
    "totalCost": 150.00,
    "checkIn": "2021-05-03",
    "checkOut": "2021-05-10",
    "guestList": [
      "Soo Yung"
    ]
  },
  ...
]
```

### Add New Reservation
`POST /reservations/` Add a new reservation to the database

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| bookingGuest_id | string | body | String representation of guest's mongo _id field |
| guestList | array | body | List of names for all guests staying on this reservation |
| checkIn | string | body | String representation of date in YYYY-MM-DD format |
| checkOut | string | body | String representation of date in YYYY-MM-DD format |
| bookedRoom | string | body | Name of the room type being booked |

Response

`Status: 201 CREATED`

### Check-In A Reservation
`PUT /reservations/checkIn/:reservation_id` Add a reservation too a room and mark the room as occupied.

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| :reservation_id | string | path | String representation of guest's mongo _id field |
| room_id | string | body | String representation of room's mongo _id field |


Response

`Status: 201 CREATED`

### Check-Out A Reservation
`PUT /reservations/checkOut/:reservation_id` Removes a reservation from room, marks room vacant and generates a task to clean the room if it doesn't already have a cleaning task today

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| :reservation_id | string | path | String representation of guest's mongo _id field |

Response

`Status: 200 OK`

```JSON
{
    "_id": "60108729ffefc9bae107564c",
    "bookingGuest": "Soo Yung",
    "roomNumber": "110",
    "roomType": "Single Queen",
    "totalCost": 150.00,
    "checkIn": "2021-05-03",
    "checkOut": "2021-05-10",
    "guestList": [
      "Soo Yung"
    ]
  }
```

## Tasks

### List Tasks
`GET /tasks`  Returns a list of tasks matching the search criteria. By default all incomplete tasks are returned

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| room_id | string | query | [Optional] String representation of guest's mongo _id field |
| roomNumber | string | query | [Optional] String of room number |
| isComplete | boolean | query | [Optional] Default: false |
| location | string | query | [Optional] String to search for location |
| dueBy | string | query | [Optional] String representation of date in YYYY-MM-DD format |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*


Response

`Status: 200 OK`

```JSON
[
  {
    "task_id": "60108729ffefc9bae107564d",
    "room_id": "507c7f79bcf86cd7994f6c0e",
    "roomNumber": "110",
    "location": "",
    "employeeCompleted": "John Smith",
    "employeeCreated": "Jane Doe",
    "department": "Housekeeping",
    "taskTitle": "Clean dirty spot",
    "taskDescription": "Behind the nightstand on the right side of the bed. Don't ask me how a guest got that there.",
    "createdAt": "2021-02-13T13:44:00.000Z",
    "dueBy": "2021-02-14T10:00:00.000Z",
    "isCompleted": true,
    "completedAt": "2021-02-13T16:15:00.000Z",
  },
  {
    "task_id": 1,
    "room_id": "",
    "roomNumber": "",
    "location": "Pool",
    ...
  },
  ...
]

```

### Add New Task
`POST /tasks` Add a new task

Response
`Status: 201 CREATED`

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| taskTitle | string | body | Title for the Description |
| taskDescription | string | body | [Optional] Description of the new task |
| room_id | string | body | [Optional] String representation of mongo _id field |
| location | string | body | Room number if this is a room or name of location |
| department | string | body | Selection for which Department this task is for (Maintenance or Housekeeping) |
| dueBy | string | body | [Optional] String of timestamp in ISO format |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*


```JSON
{
  "task_id": "60108729ffefc9bae107564d",
  "room_id": "507c7f79bcf86cd7994f6c0e",
  "roomNumber": "110",
  "location": "",
  "employeeCompleted": "",
  "employeeCreated": "Jane Doe",
  "department": "Housekeeping",
  "taskTitle": "Clean dirty spot",
  "taskDescription": "Behind the nightstand on the right side of the bed. Don't ask me how a guest got that there.",
  "createdAt": "2021-02-13T13:44:00.000Z",
  "dueBy": "2021-02-14T10:00:00.000Z",
  "isCompleted": false,
  "completedAt": "",
}
```

### Edit Task
`PUT /tasks/:task_id` Will update the task with matching _id with any fields supplied in the body

Response

`Status: 200 OK`

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| task_id | string | path | String representation of mongo _id |
| taskTitle | string | body | [Optional] Title for the task |
| taskDescription | string | body | [Optional] Description of the new task |
| location | string | body | [Optional] Room number or name of location |
| department | string | body | [Optional] Selection for which Department this task is for |

## Employees

### List Employees
`GET /employees` Will return a list of all employees.

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| searchName | string | query | [Optional] String to match searching for employee name |
| isActive | boolean | query | [Optional] Default: true |


Response

`Status: 200 OK`

```JSON
[
  {
    "_id": "60108729ffefc9bae107564e",
    "firstName": "John",
    "lastName": "Smith",
    "address1": "123 Hackreactor Rd",
    "address2": "",
    "city": "New York",
    "state": "NY",
    "zipcode": 10002,
    "country": "United States",
    "phone": "123-456-7890",
    "email": "jsmith@gmail.com",
    "wage": 15.00,
    "startDate": "2021-02-13",
    "position": "Front Desk",
    "weekHours": 30,
    "isActive": true
  },
  {
    "_id": 2,
    "firstName": "Jane",
    "lastName": "Doe",
    "address1": "456 Generic PL"
    ...
  },
  ...
]

```

### Get Specific Employee
`GET /employees/:employee_id` Will return a single employee

Path Variable

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | String representation of mongo _id |

Response

`Status: 200 OK`

```JSON
{
  "_id": "60108729ffefc9bae107564e",
  "firstName": "John",
  "lastName": "Smith",
  "address1": "123 Hackreactor Rd",
  "address2": "Apt 2",
  "city": "New York",
  "state": "NY",
  "zipcode": 10002,
  "country": "United States",
  "phone": "123-456-7890",
  "email": "jsmith@gmail.com",
  "wage": 15.00,
  "startDate": "2021-02-13",
  "position": "Front Desk",
  "weekHours": 30,
  "isActive": true
}
```


### Add New Employee
`POST /employees` Will create a new employee

Body Parameter

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| firstName | string | body | String of the employee's first name |
| lastName | string | body | String of the employee's last name |
| address1 | string | body | String of the employee's address |
| address2 | string | body | [Optional] String of the employee's address 2 |
| city | string | body | String of the employee's city |
| state | string | body | String of the employee's address state |
| zipcode | string | body | String of the employee's zipcode |
| country | string | body | String of the employee's address country |
| phone | string | body | String of the employee's phone number |
| email | string | body | String of the employee's email address |
| wage | number | body | Number of the employee's hourly wage |
| startDate | string | body | String of the employee's start date in the format "YYYY-MM-DD") |
| username | string | body | String of the employee's username |
| position | string | body | String of the employee's position (reference official list) |

Response

`Status: 200 OK`

```JSON
{
  "_id": "60108729ffefc9bae107564e",
  "firstName": "John",
  "lastName": "Smith",
  "address1": "123 Hackreactor Rd",
  "address2": "Apt 2",
  "city": "New York",
  "state": "NY",
  "zipcode": 10002,
  "country": "United States",
  "phone": "123-456-7890",
  "email": "jsmith@gmail.com",
  "wage": 15.00,
  "startDate": "2021-02-13",
  "position": "Front Desk",
  "weekHours": 0,
  "isActive": true
}
```

### Edit Employee
`PUT /employees/:employee_id` Will edit an existing employee

Body Parameter

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | String representation of mongo _id |
| firstName | string | body |[Optional] String of the employee's first name |
| lastName | string | body | [Optional]String of the employee's last name |
| address1 | string | body | [Optional] String of the employee's address |
| address2 | string | body | [Optional] String of the employee's address 2 |
| city | string | body | [Optional] String of the employee's city |
| state | string | body | [Optional] String of the employee's address state |
| zipcode | string | body | [Optional] String of the employee's zipcode |
| country | string | body | String of the employee's address country |
| phone | string | body | String of the employee's phone number |
| email | string | body | String of the employee's email address |
| wage | number | body | [Optional] Number of the employee's hourly wage |
| startDate | string | body | [Optional] String of the employee's start date in the format "YYYY-MM-DD" |
| username | string | body | [Optional] String of the employee's username |
| position | string | body | [Optional] String of the employee's position (reference official list) |

Response

`Status: 201 CREATED`

### Delete Employee
`DELETE /employees/:employee_id` Will delete an existing employee

Path Variable

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | String representation of mongo _id |

Response

`Status: 200 OK`

<!-- 
** After some thought last night I don't think we need to be able to add/edit employee positions.  We can just hard code the values in the front end as constants that can be referenced for dropdown menus. - Colin 
**

### List Employee Positions
`GET /employees/positions` Will get list of employee types.

Response

`Status: 200 OK`

```JSON
[
  "Front Desk",
  "Housekeeping",
  "Maintenance",
  "Management",
  "System Administration"
]
```

### Add Employee Position
`POST /employees/positions` Will add a new employee position.

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| type | string | body | String of new employee type |


Response

`Status: 201 CREATED`

```JSON
{
  "_id":"60108729ffefc9bae107564f",
  "position": "Front Desk",
}
``` 

### Edit Employee Type
`PUT /employees/positions/:position_id` Will edit an existing employee position.

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| position_id | string | path | String representation of employee's unique mongo _id |
| position | string | body | Position name to replace previous name |

Response

`Status: 204 OK`
-->

## Timesheets

<!-- 
** I dont think we need this one for MVP, we just need a list of timesheets for a specific employee - Colin **


### List Timesheets
`GET /timesheets` Will return a list of timesheets for all hotel employees.

Response

`Status: 200 OK`.

```JSON
[
    {
      "timesheet_id": "60108729ffefc9bae1075652",
      "employee_id": "60108729ffefc9bae1075651",
      "monday": 8,
      "tuesday": 7,
      "wednesday": 8,
      "thursday": 5,
      "friday": 9,
      "saturday": 0,
      "sunday": 0,
      "weekStart": "2021-02-08",
      "weekEnd": "2021-02-14"
    },
    {
      "timesheet_id": "60108729ffefc9bae1075653",
      "employee_id": "60108729ffefc9bae1075654",
      ...
    },
    ...
]

```
-->

### Get Employee's Timesheet
`GET /timesheets/:employee_id` Returns a list of timesheets for a specific employee based on their unique id.  Results are sorted with the most recent first

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | String representation of employee's unique mongo _id |
| count | number | query | The number or results to return. Default is 0 which returns all results |

Response

`Status: 200 OK`

```JSON
{
  "timesheet_id": "60108729ffefc9bae1075652",
  "employee_id": "60108729ffefc9bae1075651",
  "monday": 8,
  "tuesday": 7,
  "wednesday": 8,
  "thursday": 5,
  "friday": 9,
  "saturday": 0,
  "sunday": 0,
  "weekStart": "2021-02-08",
  "weekEnd": "2021-02-14"
}

```


### Edit A Timesheet
`PUT /timesheets` Will update the timesheet

`Status: 200 OK`

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| timesheet_id | string | body | String representation of mongo _id field |
| employee_id | string | body | String representation of mongo employee_id field |
| monday | number | body | Total hours the employee worked on Monday |
| tuesday | number | body | Total hours the employee worked on Tuesday |
| wednesday | number | body | Total hours the employee worked on Wednesday |
| thursday | number | body | Total hours the employee worked on Thursday |
| friday | number | body | Total hours the employee worked on Friday |
| saturday | number | body | Total hours the employee worked on Saturday |
| sunday | number | body | Total hours the employee worked on Sunday |

Response

`Status: 200 OK`

```JSON
{
  "timesheet_id": "60108729ffefc9bae1075652",
  "employee_id": "60108729ffefc9bae1075651",
  "monday": 8,
  "tuesday": 7,
  "wednesday": 8,
  "thursday": 5,
  "friday": 9,
  "saturday": 0,
  "sunday": 0,
  "weekStart": "2021-02-08",
  "weekEnd": "2021-02-14"
}
```
