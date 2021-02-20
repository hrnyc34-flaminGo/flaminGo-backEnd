# Flamingo API

## Table of Contents

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
  
  - [Add New Reservation](#add-new-reservation)
  
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
  

## Rooms
### List Rooms
`GET /rooms` Retrieves a list of rooms. By default all rooms are returned

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| roomNumber | string | query | [Optional] Room number |
| floorNumber | number | query | [Optional] Floor number |
| roomType | string | query | [Optional] Room type |
| isClean | boolean | query | [Optional] Current cleanliness status of room |
| isOccupied | boolean | query | [Optional] Current occupancy status of room |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*

**important : reservation_id will return "" or null if there is no reservation**

Response

`Status: 200 OK`

```JSON
[
  {
    "_id": "602b14fd541461fcab3686b5",
    "roomType_id": "602b118a541461fcab3686ac",
    "reservation_id": "602b3b5e94bd6e1e4f85decf",
    "roomType": "Ocean View King Suite",
    "price": "400.00",
    "amenities": [
        "Ocean View",
        "TV",
        "Non-Smoking"
    ],
    "roomNumber": "110",
    "floorNumber": 1,
    "isClean": true,
    "isOccupied": false,
    "isUsable": true,
    "tasks": [
      {
        "_id": "602b282c94bd6e1e4f85dea2",
        "room_id": "602b14fd541461fcab3686b5",
        "location": "110",
        "taskTitle": "Clean Room",
        "taskDescription": "Daily Cleaning",
        "department": "Housekeeping",
        "createdAt": "2021-02-15T11:00:00.000Z",
        "dueBy": "2021-02-15T20:00:00.000Z",
        "isComplete": false,
        "isCleaning": true,
        "completedAt": "",
        "employeeCompleted": "",
        "employeeCreated": "system",
        "employeeAssigned": "Spencer Brook",
        "employeeAssigned_id": "auth0|602c301102061a0069805815",
        "employeeCompleted_id": "",
        "employeeCreated_id": ""
      },
      {
        "_id": "602b29a394bd6e1e4f85deac",
        "room_id": "602b14fd541461fcab3686b5",
        "location": "110",
        ...
      }
    ],
    "currentGuests": [
      {
        "firstName": "Guest",
        "lastName": "One",
        "phone": "123-456-7890",
        "email": "guestOne@madeup.com"
      },
      {
        "firstName": "Guest",
      ...
      }
    ]
  },
  {
    "_id": "602b1b4d94bd6e1e4f85de79",
    "roomType_id": "602b100e541461fcab3686a7",
    "reservation_id": "",
    "roomType": "Single Queen",
    "price": "100.00",
  ...
  }
]
```

### Add A Room
`POST /rooms` Add a new room to the room list

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| roomNumber | string | body | String of room number |
| floorNumber | number | body | [Optional] Floor number |
| roomType | string | body | Room type of new room |

Response

`Status: 201 CREATED`

### Edit A Room
`PUT /rooms/:room_id` Edit a specific room

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| :room_id | string | path | String representation of mongo _id |
| roomNumber | string | body | [Optional] String of room number |  |
| floorNumber | number | body | [Optional] Floor number |  |
| roomType | string | body | [Optional] Room type of new room |

Response

`Status: 201 CREATED`

### Get Specific Room
`GET /rooms/:room_id` Retrieves a specific room by its id

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| room_id | string | path | String matching the mongo _id field |

Response

`Status: 200 OK`

```JSON
{
    "_id": "602b14fd541461fcab3686b5",
    "roomType_id": "602b118a541461fcab3686ac",
    "reservation_id": "602b3b5e94bd6e1e4f85decf",
    "roomType": "Ocean View King Suite",
    "price": "400.00",
    "amenities": [
        "Ocean View",
        "TV",
        "Non-Smoking"
    ],
    "roomNumber": "110",
    "floorNumber": 1,
    "isClean": true,
    "isOccupied": false,
    "isUsable": true,
    "tasks": [
      {
        "_id": "602b282c94bd6e1e4f85dea2",
        "room_id": "602b14fd541461fcab3686b5",
        "location": "110",
        "taskTitle": "Clean Room",
        "taskDescription": "Daily Cleaning",
        "department": "Housekeeping",
        "createdAt": "2021-02-15T11:00:00.000Z",
        "dueBy": "2021-02-15T20:00:00.000Z",
        "isComplete": false,
        "isCleaning": true,
        "completedAt": "",
        "employeeCompleted": "",
        "employeeCreated": "system",
        "employeeAssigned": "Spencer Brook",
        "employeeAssigned_id": "auth0|602c301102061a0069805815",
        "employeeCompleted_id": "",
        "employeeCreated_id": ""
      },
      {
        "_id": "602b29a394bd6e1e4f85deac",
        "room_id": "602b14fd541461fcab3686b5",
        "location": "110",
        ...
      }
    ],
    "currentGuests": [
      {
        "firstName": "Guest",
        "lastName": "One",
        "phone": "123-456-7890",
        "email": "guestOne@madeup.com"
      },
      {
        "firstName": "Guest",
      ...
      }
    ]
  }
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
    "price": "150.00",
    "amenities": [
      "TV",
      "Ocean View",
      "Smoking"
    ]
  },
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Single King",
    "price": "200.00",
    "amenities": [
      "Mini-Fridge",
      "Pool Side",
      "Non-Smoking"
    ]
  },
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Suite",
    "price": "400.00",
    "amenities": [
      "Kitchen",
      "Hot Tub",
      "Sauna",
      "Non-Smoking"
    ]
  },
  {
    "_id": "5ff8c7b6aa12892093205486",
    "roomType": "Double Twin",
    "price": "100.00",
    "amenities": [
      "Pet Friendly",
      "Non-Smoking"
    ]
  },
  ...
]

```

## Reservations

### Inquire Room Availability
`GET /reservations/availability/:date` Will return the quantity of available rooms on the supplied date, broken down by room type.

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| :date | string | path | Date of inquiry as a string in the format "YYYY-MM-DD" |

Response:

`Status: 200 OK`

```JSON
{
  "date": "2021-11-10",
  "results": [
    {
      "name": "Single Queen",
      "amenities": [
        "TV"
      ],
      "qty": 10,
      "price": "150.00"
    },
    {
      "name": "Double Queen",
      "amenities": [
        "Ocean View",
        "TV",
        "Non-Smoking"
      ],
      "qty": 7,
      "price": "225.00"
    },
    ...
  ]
}
```

### List Reservations
`GET /reservations` Will return a list of reservations sorted by the check-in date

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
    "room_id": "602b14fd541461fcab3686b5",
    "bookingGuest": "John Smith",
    "room_id": "",
    "roomNumber": "",
    "roomType": "Single Queen",
    "totalCost": "150.00",
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
    "room_id": "60108729ffefc9bae10756bc",
    "roomNumber": "110",
    "roomType": "Single Queen",
    "totalCost": "150.00",
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
`POST /reservations` Add a new reservation to the database

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| bookingGuest | string | body | Guest object. Guests can have 4 properties: firstName, lastName, phone, email. All values should be strings Ex: `{firstName: "Bob", lastName: "French", phone: "123-456-7890", email: "bobFrench@email.com"}`|
| guestList | array | body | Array of guest objects. Guests can have 4 properties: firstName, lastName, phone, email. All values should be strings |
| checkIn | string | body | String representation of date in YYYY-MM-DD format |
| checkOut | string | body | String representation of date in YYYY-MM-DD format |
| roomType | string | body | Room type being booked.  Should use the official list of room types. |

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
    "bookingGuest": {
        "firstName": "Adam",
        "lastName": "Pollock",
        "phone": "540-771-6242",
        "email": "AdamDPollock@teleworm.us"
    },
    "roomNumber": "110",
    "roomType": "Single Queen",
    "totalCost": "1050.00",
    "checkIn": "2021-05-03T13:44:00.000Z",
    "checkOut": "2021-05-10T13:44:00.000Z",
    "guestList": [
      {
        "firstName": "Guest",
        "lastName": "One",
        "phone": "123-456-7890",
        "email": "guestOne@madeup.com"
      },
    ...
    ]
  }
```

## Tasks

### List Tasks
`GET /tasks`  Returns a list of tasks matching the search criteria. By default all incomplete tasks are returned

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| isComplete | boolean | query | [Optional] Default: false |
| room_id | string | query | [Optional] String representation of guest's mongo _id field |
| location | string | query | [Optional] String to search for location |
| dueBy | string | query | [Optional] String representation of date in ISO format |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*


Response

`Status: 200 OK`

```JSON
[
  {
    "task_id": "60108729ffefc9bae107564d",
    "room_id": "507c7f79bcf86cd7994f6c0e",
    "location": "110",
    "taskTitle": "Clean dirty spot",
    "taskDescription": "Behind the nightstand on the right side of the bed. Don't ask me how a guest got that there.",
    "department": "Housekeeping",
    "createdAt": "2021-02-13T13:44:00.000Z",
    "dueBy": "2021-02-14T10:00:00.000Z",
    "completedAt": "2021-02-13T16:15:00.000Z",
    "isComplete": true,
    "isCleaning": false,
    "employeeCreated": "Jane Doe",
    "employeeCreated_id": "auth0|602c1cb963504c0071df24a6",
    "employeeCompleted": "John Smith",
    "employeeCompleted_id": "auth0|603r1cb963504c0071df24a7",
    "employeeAssigned": "Joe Slo",
    "employeeAssigned_id": "auth0|604a1cb963504c0071df24b8",
  },
  {
    "task_id": "60435729ffefc9bae132533d",
    "room_id": "",
    "location": "Pool",
    ...
  },
  ...
]
```

### Add New Task
`POST /tasks` Add a new task

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| location | string | body | Room number if this is a room or name of location |
| taskTitle | string | body | Title for the Description |
| taskDescription | string | body | [Optional] Description of the new task |
| department | string | body | Selection for which Department this task is for (Maintenance or Housekeeping) |
| employeeCreated | string | body | Employee first and last name who created the task
| employeeCreated_Id | string | body | Employee AuthO id who created the task
| employeeAssigned | string | body | [Optional] Employee first and last name who is assigned to the task
| employeeAssigned_id | string | body | [Optional] Employee AuthO id who is assigned to the task
| dueBy | string | body | [Optional] String of timestamp in ISO format |

*NOTE: Each additional parameter is treated as an AND operation narrowing the search*

Response
`Status: 201 CREATED`

### Edit Task
`PUT /tasks/:task_id` Will change the task to complete

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| task_id | string | path | String representation of mongo _id |
| employeeCompleted | string | body | Employee first and last name who completed task |
| employeeCompleted_id | string | body | Employee AuthO id
| isComplete | boolean | body | Task completion status. Set to true. |

Response

`Status: 204 No Content`


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
    "id": "auth0|999999999999999999999999",
    "name": "Theo Telonis",
    "email": "theo123@gmail.com",
    "address1": "456 Main St.",
    "address2": "",
    "city": "New York",
    "state": "NY",
    "zipcode": 10012,
    "country": "USA",
    "phone": "123-456-7890",
    "wage": 12654,
    "startDate": "2021-02-13",
    "position": "systemAdministration",
    "weekHours": 30,
    "isActive": true
  },
  {
    "id": "auth0|000000000000000000000000",
    "name": "Josh Adams",
    "email": "josh123@gmail.com",
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
| employee_id | string | path | Employee AuthO id |

Response

`Status: 200 OK`

```JSON
{
  "id": "auth0|999999999999999999999999",
  "name": "Theo Telonis",
  "email": "theo123@gmail.com",
  "address1": "456 Main St.",
  "address2": "",
  "city": "New York",
  "state": "NY",
  "zipcode": 10012,
  "country": "USA",
  "phone": "123-456-7890",
  "wage": 12654,
  "startDate": "2021-02-13",
  "position": "systemAdministration",
  "weekHours": 30,
  "isActive": true
}
```


### Add New Employee
`POST /employees` Will create a new employee

Body Parameter

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| firstName | string | body |[Optional] String of the employee's first name |
| lastName | string | body | [Optional]String of the employee's last name |
| address1 | string | body | String of the employee's address |
| address2 | string | body | [Optional] String of the employee's address 2 |
| city | string | body | String of the employee's city |
| state | string | body | [Optional] String of the employee's address state |
| zipcode | string | body | [Optional] String of the employee's zipcode |
| country | string | body | String of the employee's address country |
| phone | string | body | [Optional] String of the employee's phone number |
| email | string | body | String of the employee's email address |
| wage | number | body | Number of the employee's hourly wage |
| startDate | string | body | String of the employee's start date in the format "YYYY-MM-DD") |
| position | string | body | String of the employee's position (reference official list) |

Response

`Status: 200 OK`

```JSON
{
  "id": "auth0|999999999999999999999999",
  "name": "Theo Telonis",
  "email": "theo123@gmail.com",
  "address1": "456 Main St.",
  "address2": "",
  "city": "New York",
  "state": "NY",
  "zipcode": 10012,
  "country": "USA",
  "phone": "123-456-7890",
  "wage": 12654,
  "startDate": "2021-02-13",
  "position": "systemAdministration",
  "weekHours": 30,
  "isActive": true
}
```

### Edit Employee
`PUT /employees/:employee_id` Will edit an existing employee

Body Parameter

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | Employee AuthO id |
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
| position | string | body | [Optional] String of the employee's position (reference official list) |

Response

`Status: 201 CREATED`

### Delete Employee
`DELETE /employees/:employee_id` Will delete an existing employee

Path Variable

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | Employee AuthO id |

Response

`Status: 200 OK`

## Timesheets

### Get Employee's Timesheet
`GET /timesheets/:employee_id` Returns a list of timesheets for a specific employee based on their unique AuthO id. Results are sorted with the most recent first

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| employee_id | string | path | Employee AuthO id |
| count | number | query | The number or results to return. Default is 0 which returns all results |

Response

`Status: 200 OK`

```JSON
{
  "employee_id": "auth0|602c1cb963504c0071df24a6",
  "monday": 8,
  "tuesday": 7,
  "wednesday": 8,
  "thursday": 5,
  "friday": 9,
  "saturday": 0,
  "sunday": 0,
  "weekStart": "2021-02-08",
  "weekEnd": "2021-02-14",
  "weekHours": 37
}
```


### Edit A Timesheet
`PUT /timesheets` Will update the timesheet

Parameters

| Parameter | Type | In | Description |
| --------- | ---- | --- | ----------- |
| timesheet_id | string | body | String representation of mongo _id field |
| employee_id | string | body | Employee AuthO id |
| monday | number | body | Total hours the employee worked on Monday |
| tuesday | number | body | Total hours the employee worked on Tuesday |
| wednesday | number | body | Total hours the employee worked on Wednesday |
| thursday | number | body | Total hours the employee worked on Thursday |
| friday | number | body | Total hours the employee worked on Friday |
| saturday | number | body | Total hours the employee worked on Saturday |
| sunday | number | body | Total hours the employee worked on Sunday |

Response

`Status: 204 OK`