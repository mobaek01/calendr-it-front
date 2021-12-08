# Calendr-It

### Approach Taken
Todos:
* First, I started out by setting up the backend of the application but creating all CRUD functionality and also set up the local database (Postgres). Once the backend was successfully created and I was able to view, add, update, and remove data; I moved onto my frontend of the application.
I tackled the frontend the same way as the backend but setting up all CRUD functionality. Once I confirmed CRUD in the frontend and confirmed that the connection to the backend was successful, I uploaded all backend and frontend to Heroku.

Users:
* Users were implemented into the application and I knew that I would only want the users to view their own todos but I needed to implement one to many relationships.
I was able link the todos to the user by adding a column to the todo table called user_id. When adding the todo, I hard coded the ID of the currently signed-in user into the todo row of the todos table.
When displaying the todos, I used a ternary operator to only display the todos where the user_id of the todo item and the id of the current user matched.

Calendar:
* By using the react library called 'react-big-calendar' I was able to implement a calendar that displays the todos on whichever day it was assigned to.

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
Heroku

### Unsolved Problems
1. When using the updatedTodos & removeTodos dispatchers, the global state does not update
    * removeTodos: The delete button is currently a button that is used to delete the specific todo from the database and I am unable to

### Future Impovements/Additions
1. Add the Socket.io library so that users can get live updates notifying them that there is are todos to be completed for the day
2. Add a property to the todo schema for whether or not the todo has been completed. Once added, create a chart that displays the ratio between completed and uncompleted per day.

### Live Links
Back-end: https://calendr-it.herokuapp.com/todos  
Front-end: https://calendr-it-front.herokuapp.com/

### Documentation and Videos I referenced:
* Documentation
https://github.com/mahuntington/PERN-Stack
https://github.com/NikValdez/reactCalendarTut/blob/master/src/App.js
https://jquense.github.io/react-big-calendar/examples/index.html#api
https://react-redux.js.org/tutorials/quick-start

* Videos
https://www.youtube.com/watch?v=lyRP_D0qCfk&ab_channel=DarwinTech
