/**
* index.js
* This is your main app entry point
*/

// Set up express, bodyparser and EJS
const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // set the app to use ejs for rendering


app.use(express.static(__dirname + '/public')); // set location of static files

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require('sqlite3').verbose();
global.db = new sqlite3.Database('./database.db', function (err) {
  if (err) {
    console.error(err);
    process.exit(1); // bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); // tell SQLite to pay attention to foreign key constraints
  }
});

// Home page in views/index.ejs
app.get('/', (req, res) => {
  res.render("index.ejs")
});

// add route handlers in organizerRoutes to the app under the path /organizer
const organizerRoutes = require("./routes/organizer");
app.use('/organizer', organizerRoutes);

// Add all the route handlers in usersRoutes to the app under the path /users
const usersRoutes = require('./routes/users');
app.use('/users', usersRoutes);

// Add all the route handlers in usersRoutes to the app under the path /users
const attendeeRoutes = require('./routes/attendee');
app.use('/attendee', attendeeRoutes);





// Make the web application listen for HTTP requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

