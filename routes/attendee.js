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
        let queryPublished = 'SELECT * FROM events WHERE published == 1;'
        global.db.all(queryPublished,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {

              result.sort(compare);
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
  let event_id = req.params.event_id;
  let query = "SELECT title, description, heading FROM site_settings where name='attendee_events_page'";
  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {

        // site related templates
        data.site = result[0];
        // start new

        let queryEvent = 'SELECT * FROM events WHERE id == ' + event_id + ';';
        global.db.all(queryEvent,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {
              // add dat from query
              data.published = result;
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

// taken from:
//https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value/16174180#comment31549267_1129270
// nice.
function compare(a, b) {
  if (a.date_event < b.date_event) {
    return -1;
  }
  if (a.date_event > b.date_event) {
    return 1;
  }
  return 0;
}


module.exports = router;