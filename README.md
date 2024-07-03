# Restaurant Reservation System

Project Prompt

> You have been hired as a full stack developer at _Periodic Tables_, a startup that is creating a reservation system for fine dining restaurants.
> The software is used only by restaurant personnel when a customer calls to request a reservation.
> At this point, the customers will not access the system online.


## Links

Need to add Live Demo and API docs 

## Screenshots 

### Dashboard (Home Page):
![dashboard](/screenshots/dashboard-page.png)
The Dashboard can be found at "/dashboard" and has the following features: 

- Lists the reservations for the specified date. The date is defaulted today and the reservations are sorted by their entered time. 
- Each reservation displays its necessary information, including its status. A "Seat Reservation" button is displayed only for reservations with the default status of "booked".
- Each reservation has an "Edit Reservation" and "Cancel Reservation" button. 
- Lists all tables sorted by their name. Each table will show either "Free" or "Occupied" depending on the availablity of the table. If a table is "Occupied" the "Finish" button is enabled, otherwise the "Finish" button is disabled. 
- Lists all errors received from the API.

### Create Reservation:
![create-reservation](/screenshots/create-reservation-page.png)

- When you click on New Reservation on the side bar, you are taken to the Create Reservation page at "/reservations/new". This form you to create a new reservation, filling out required field. 
- Clicking "Submit" saves the information then displays the "/dashboard" page with the date of the new reservation being dispalyed.
- Clicking "Cancel" brings you back to the previous page you were visiting.
- Error messages received from the API are displayed. 

### Create New Table:
![create-table](/screenshots/create-new-table-page.png)

### Seat a Reseravtion: x
![seat-reservation](/screenshots//seat-reservation-page.png)

### Seated Reservation: x
![seated-reservation](/screenshots/seated-reservation-page.png)

### Finishing a Table: 
![finish-table](/screenshots/finish-table-page.png)

### Finished Table: 
![finished-table](/screenshots/table-finished-page.png)

### Search for Reservation: 
![search-reservation](/screenshots/search-reservation-page.png)

### Found Reservation: 
![found-reservation](/screenshots/found-res-page.png)

### No Reservations Found: 
![no-found-reservation](/screenshots/res-not-found-page.png)

### Edit Reservation: 
![edit-reservation-click](/screenshots/edit-reservation-click-page.png)
![edit-reservation-page](/screenshots/edit-res-page.png)

### Editted Reservation: 
![editted-reservation](/screenshots/editted-res-page.png)

### Cancel Reservation: 
![cancel-reservation-click](/screenshots/cancel-res-click-page.png)
![cancel-reservation-page](/screenshots/cancel-message-page.png)

### Cancelled Reservation: 
![cancelled-reservation](/screenshots/res-cancelled-page.png)

Add screenshots of functionality
Add summary of each functionality

## Technology Used
### Built with: 
#### React.js, JSX, HTML, CSS, and Bootstrap

## Installation Instructions
1. Fork and clone this repository.
2. Run `cp ./.env.sample ./env`
3. You should not need to make changes to the `./env` file unless you want to connect to a backend at a location other than `http://localhost:5000`.
4. Run `npm install` to install project dependencies.
5. Run `npm run start` to start the frontend of the application.