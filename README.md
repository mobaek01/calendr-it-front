# Calendr-It

### Approach Taken
First, I started with setting up the standard PERN Stack of the application. I implemented all CRUD functionality (READ, CREATE, UPDATE, DELETE).

### User Stories
* A new user is able to create an account to start using Calendr-It
    * Once a new user is created and todos are added, users will only be able to see the todos that they have added under their user account
* The user has two view settings (which are swappable)
    * Todo List View
    * Calendar View
* The user can add todos to plan their future schedules
    - Input Fields
        * Todo Date
        * Todo Title
        * Todo Description
        * Todo Start Time
        * Todo End Time
* The user is able to edit a specific todo and also delete a specific todo

### Technologies Used
PERN STACK  
* Postgres
* Express.js
* React
    * React-Big-Calendar
    * Moment
    * Axios
* Node.js

### Unsolved Problems
1. Within the calendar view of the application, the todos will only appear once the page has been reloaded
    * Issue: The { useEffect } of the Calendar component does not run quickly enough
2. The sliding navigation bar has a gap on top when you scroll down the page
3. When using the addTodos dispatcher, the store is not recognizing the state and is coming out undefined

### Live Links
Back-end: https://calendr-it.herokuapp.com/todos  
Front-end: https://calendr-it-front.herokuapp.com/
