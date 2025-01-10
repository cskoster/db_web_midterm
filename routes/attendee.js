/**
 * attendee.js
 * Routes for:
 *  Attendee main page
 *  Attendee setting page
 */


const express = require("express");
const router = express.Router();

// // Attendee Event page
// router.get("/event", function (req, res) {
//   res.render("attendeeEvent.ejs")
// });


// Attendee Home
router.get("/", function (req, res) {
  let query = "SELECT title, description, heading FROM site_settings where name='attendee_page'";
  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.render("attendeeHome.ejs", result[0])
      }
    }
  );
});


// Attendee event
router.get("/event", function (req, res) {
  let query = "SELECT title, description, heading FROM site_settings where name='attendee_events_page'";
  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.render("attendeeEvent.ejs", result[0])
      }
    }
  );
});



module.exports = router;