/**
 * attendee.js
 * Routes for:
 *  Attendee main page
 *  Attendee setting page
 */


const express = require("express");
const router = express.Router();
const util = require('./utils');


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
        let queryPublished = 'SELECT * FROM events WHERE published == 1;'
        global.db.all(queryPublished,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {

              result.sort(util.compare);
              data.published = result;
              res.render("attendeeHome.ejs", data)
            }
          });
        // end new
      }
    })
});


// Attendee event
// read the query param
// https://stackoverflow.com/questions/20089582/how-to-get-a-url-parameter-in-express
// router.get("/event/:event_id", function (req, res) {
router.get('/event/:event_id', function (req, res) {
  let data = {};

  // there is a ':' in front. TODO: why?
  let event_id = req.params.event_id[1];

  let query = "SELECT title, description, heading FROM site_settings where name='attendee_events_page'";
  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {

        // site related templates
        data.page = result[0];
        // start new

        // console.log(event_id)
        let queryEvent = 'SELECT * FROM events WHERE id == "' + event_id + '";';

        // console.log("Q: ", queryEvent);
        global.db.all(queryEvent,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {
              data.event = result[0];
              console.log(data);


              res.render("attendeeEvent.ejs", data);
            }
          });
        // end new
        // add "event" to template object

        // res.render("organizerHome.ejs", data)
      }



      // res.render("attendeeEvent.ejs", result[0]);

    }

  );
});

router.post("/make_booking", (req, res, next) => {
  console.log("make Booking");
  let data = {};

  // let dateBooked = new Date();
  // dateBooked = util.formatDate(dateBooked);
  console.log(req.body.name, req.body.email, req.body.num_tickets);

  data.name = req.body.name;
  data.email = req.body.email;
  data.num_tickets = req.body.num_tickets;


  let query = "SELECT title, description, heading FROM site_settings where name='attendee_booked_page'";
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        data.page = result[0]; // only one page with this name. db constraint
        console.log(data);
        res.render("attendeeBooked", data);
      }
    }
  );




});


module.exports = router;