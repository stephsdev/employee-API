# Road Map
### Ultimate Goal: Set up API to handle modifying employees as flexibly and user-friendly as possible.

 - ~~configure database connection - add as an asynchronous pool so errors can be caught without stalling or killing the server.~~
 -  ~~set up routes. /employees accepts `GET` which is controlled with `getAllEmployees` and `POST` which is controlled with `insertNewEmployee`. /employees/:email accepts `GET`controlled with `getEmployee`, `PATCH` controlled with `updateEmployee` and `DELETE` controlled with `deleteEmployee`~~
 - ~~set up controller with exported functions for handling the various requests: `getAllEmployees, insertNewEmployee, getEmployee, updateEmployee, deleteEmployee`. Each function calls to a method of the 'Employee' Class/Model~~
 - ~~set up Employee Class/Model. Add constructor with default values matching the default values in employee table of the database. Add methods: `save(), updateByEmail(email, setVals = {}), delete(email), findAll(), findByEmail(email)`~~ 
- Security - add authentication for `POST`, `PATCH`, and `DELETE` requests 