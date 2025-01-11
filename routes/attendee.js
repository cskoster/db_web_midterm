/**
 * attendee.js
 * Routes for:
 *  Attendee main page
 *  Attendee setting page
 */


const express = require("express");
const router = express.Router();


// Attendee Home
router.get("/", function (req, res) {
  let query = "SELECT title, description, heading FROM site_settings where name='attendee_page'";

  let data = {};
  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        // add "page" info to template object
        data.page = result[0]; // only one page with this name. db constraint

        /* 
          NOTE: this could be done by "SELECT * FROM events;"
          However, this would put login in the view in violateion of
          Separation of concern (SOC).
        */
        let queryPublished = 'SELECT * FROM events WHERE published == 1;'
        global.db.all(queryPublished,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {
              data.published = result;
              res.render("attendeeHome.ejs", data)
            }
          });
        // end new
        // add "event" to template object

        // res.render("organizerHome.ejs", data)
      }
    }

  )
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