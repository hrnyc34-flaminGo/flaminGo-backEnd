# FlaminGo Back-end by Tonhil Hotels
> Table of Contents

- [Introduction](#Introduction)
- [Technologies](#Technologies)
- [Components](#Components)
   - [Login Portal Page](#Login-Portal-Page)
   - [Front desk](#Front-desk)
   - [Housekeeping/maintenance](#Housekeeping/maintenance)
   - [Management](#Management)
   - [System Admin](#System-Admin)

- [Installation Guidelines](#Installation-Guidelines)

---

## Introduction
> 'Hotel Management Software' Developed by a team of 11 developers
```
We developed this project as a group over the course of 7 days during the Hack Reactor program.
UPDATED NEEDED
```
* Deployed project can be found [here](URL_for_link).

## Technologies
>  For this project, we used the following languages and frameworks in our implementation

* Front-end
  + React
    Hooks
    Context
  + Axios
  + Webpack
  + Babel

* Server
  + Nodejs
  + Express
  + Nodemon
  + Morgan

* Back-end
  + MongoDB
  + Mongoose

* Deployment
  + Docker
  + AWS

* Test Suite
  + Jest
  + Enzyme

* Style Guide
  + ESLint with AirBNB style guide

## Components
Document can be found [here](URL_for_link).

#### 0. LOGIN PORTAL PAGE
 **Main Landing Page:**
  * This page will have a Login & Password
  * Each user will have their own token attached which will let them have certain permissions

#### 1 .FRONT DESK COMPONENTS
  * Guest Check In
  * Guest Check Out
  * Check Room Status
  * Add A Reservation


#### 2 .HOUSEKEEPING / MAINTENANCE COMPONENTS
  * See Tasks
  * Add Task Form
  * Check Room Status_intergrate into front-desk component

#### 3. MANAGEMENT COMPONENTS
  * Employee List
  * Employee Details
  * Timesheets
  * Payments

#### 4 .SYSTEM ADMIN COMPONENTS
 **Hotel Setup for each location :**
  * Add rooms
  * Edit rooms

## Installation/Running Instructions

### Using docker-compose

  1. Clone this repo to your local machine
  2. Follow the instructions in the ```.env.example``` to set up an auth0 account and get the necessary connection info in to a ```.env``` file.
  3. Run ```docker-compose up -d``` in the root directory of this repository
  4. Navigate to ***localhost:3000*** to view the site

### Without Docker
  *These instructions assume that you have mongoDB installed and running on your computer using the default configuration.  We also assume that you have Node.js installed and are running at least v14*
  1. Clone this repo to your local machine
  2. Navigate to the ```/db/sampleData``` directory and run the command ```mongorestore --drop --preserveUUID``` to load sample application data
  3. Follow the instructions in the ```.env.example``` to set up an auth0 account and get the necessary connection info in to a ```.env``` file.
  5. Navigate to the root directory of the repo and run the command ```npm install```
  6. Once all the dependencies have installed run ```npm start```
  7. Site will be running on ***localhost:3000***


_Have a great day!_
