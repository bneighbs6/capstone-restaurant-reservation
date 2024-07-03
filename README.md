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

- When the user clicks on "New Reservation" on the side bar, you are taken to the Create Reservation page at "/reservations/new". This form allows you to create a new reservation. Filling out each field is required. 
- Clicking "Submit" saves the information then displays the "/dashboard" page with the date of the new reservation being dispalyed.
- Clicking "Cancel" brings the user back to the previous page visited.
- Error messages received from the API are displayed. 

### Create New Table:
![create-table](/screenshots/create-new-table-page.png)

- When the user clicks on "New Table" on the side bar, you are taken the New Table page at "/tables/new. This form allows you to create a new table. Filling out each field is required. 
- Clicking "Submit" saves the information and displays the "/dashboard" page. 
- Clicking "Cancel" brings the user back to the previous page visited.
- Error messages received from the API are displayed. 

### Seat a Reseravtion: 
![seat-reservation](/screenshots//seat-reservation-click.png)
![seat-res-click](/screenshots/seat-reservation-page.png)
- When the user clicks on the "Seat Reservation" button for a specific reservation, they will be sent to the Seat Reservation page at "/reservations/:reservation_id/seat". 
- This page allows the user to choose which table to seat the reservation. The drop-down menu items are listed so that the first data info is the Table Name, and the second data info is the Table Capacity.
- Clicking "Submit" assigns the table to the reservation then brings the user back to the "/dashboard" page.
- Clicking "Cancel" brings the user back to the previous page visited.
- Error messages received from the API are displayed. 

### Seated Reservation: x
![seated-reservation](/screenshots/seated-reservation-page.png)
- The reservation is now displayed as "seated" and the table is shown as "Occupied".

### Finishing a Table: 
![finish-table](/screenshots/finish-table-page.png)
- When the user clicks "Finish" for a given table, the above confirmation message appears. 
- If the user clicks "OK", the table will remove the "Occupied" assignment and become "Free" again. This will also make the reservations status "finished" and remove it from the Reservations list on the "/dashboard" page. 
- If the user clicks "Cancel" nothing happens. 

### Finished Table: 
![finished-table](/screenshots/table-finished-page.png)
- All information for the reservation is no longer visible once it is finished. 

### Search for Reservation: 
![search-reservation](/screenshots/search-reservation-page.png)
- When the user clicks "Search" on the side bar, they are brought to the Search page at "/search". 
- This page displays a fillable input field to begin typing a phone number. The user can type either a partial or full phone number. This page also has a "Find" button. If clicked, and a reservation or reservations match the given phone number, they will be displayed on the "/search" page. The status of the reservation does not matter.  


### Found Reservation: 
![found-reservation](/screenshots/found-res-page.png)
- Found reservations displayed. 

### No Reservations Found: 
![no-found-reservation](/screenshots/res-not-found-page.png)
- If no reservations match the given phone number, the user sees the following response, "No reservations found."

### Edit Reservation: 
![edit-reservation-click](/screenshots/edit-reservation-click-page.png)
![edit-reservation-page](/screenshots/edit-res-page.png)
- When the user clicks on the "Edit Reservation" button for a specific reservation, they are taken to the "/reservations/:reservation_id/edit" page. 
- This page displays the same form as the Create Reservation page does, but this time with all fields filled in with the given reservation. 
- Clicking "Submit" will save the reservation with the updated information, and bring the user back to the "/dashboard" page. 
- Clicking "Cancel" makes no changes to the reservation and brings the user back to the previous page. 

### Editted Reservation: 
![editted-reservation](/screenshots/editted-res-page.png)
- Displays reservation with the updated information.

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