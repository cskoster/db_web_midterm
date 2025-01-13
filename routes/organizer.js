const express = require("express");
const router = express.Router();

// Sort and date helpers
const util = require('./utils');

// Organizer Home
router.get("/", function (req, res) {
  let query = "SELECT title, description, heading FROM site_settings where name='organizer_home_page'";
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

        let queryUnpublished = 'SELECT * FROM events WHERE published == 0;'
        global.db.all(queryUnpublished,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {
              result.sort(util.compare);
              data.unPublished = result;

              let queryPublished = 'SELECT * FROM events WHERE published == 1;';
              global.db.all(queryPublished,
                function (err, result) {
                  if (err) {

                    // do something if error from lab: res.redirect("/");
                    next(err); //send the error on to the error handler
                  } else {

                    result.sort(util.compare);
                    data.published = result;
                    // console.log("HOME: ", data);
                    res.render("organizerHome.ejs", data)
                  }
                }); //End get published events query
            }
          }
        ); // END get unpublished query
      }
    }); // end get site setting query
});


// Set up title, heading and description of the site pages
router.get("/siteSettings", function (req, res) {
  let query = "SELECT title, description, heading FROM site_settings where name='site_settings_page'";
  let data = {};

  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {


        data.page = result[0];
        let query = " SELECT title, description, heading, name FROM site_settings WHERE name='home_page'  OR name='organizer_home_page'  OR name='edit_event_page' OR name='site_settings_page' OR name='attendee_page' OR name='attendee_events_page';";

        // get all the site settings
        global.db.all(query,
          function (err, result) {
            if (err) {

              // This happens if there is no database
              next(err); //send the error on to the error handler
            } else {

              data.siteSettings = result;
              console.log(data);
              res.render("siteSettings.ejs", data);
            }
          }); // End get all site settings query
      }
    }); // End get site specific query
});


// Update site wide page settings
router.post("/update_site_settings", (req, res, next) => {
  query = "UPDATE site_settings SET 'heading'= ?,'description'= ? WHERE name= ?";
  query_parameters = [req.body.heading, req.body.description, req.body.name];

  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.redirect("/organizer/siteSettings");
      }
    }); // End update site settings query
});


// Organizer Create Event Home
router.get("/create_event", function (req, res) {

  let data = {};
  let query = "SELECT title, description, heading FROM site_settings where name='create_event_page'";
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {
        data.page = result[0]; // only one page with this name. db constraint
        res.render("organizerCreateEvent.ejs", data);
      }
    }); // END site settings query
});

/**POST a create new event */
router.post("/create_event", (req, res, next) => {

  let dateEdited = new Date();

  dateEdited = util.formatDate(dateEdited);
  let dateCreated = dateEdited;

  let query = "INSERT INTO events (title, description,  date_created, published, date_event, date_edited, date_published, num_tickets,num_tickets_sold ) VALUES (?,?,?,?,?,?,?,?,?)";
  let query_parameters = [req.body.title, req.body.description, dateCreated, 0, req.body.date_event, dateEdited, 0, req.body.num_tickets, 0];

  // // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.redirect("/organizer/");
      }
    }); // end site settings query
});

// Organizer Edit event page
router.post("/edit_event", function (req, res) {
  // date object holds data for template
  let data = {};

  let query = "SELECT title, description, heading FROM site_settings where name='edit_event_page'";
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        data.page = result[0];

        let queryEvent = 'SELECT * FROM events WHERE id=?';
        let query_parameters = [req.body.id];
        global.db.all(queryEvent, query_parameters,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {

              data.event = result[0]; // only 1. searched by id
              console.log("DATA: ", data);
              res.render("organizerEditEvent.ejs", data)
            }
          }); // END select from event query
      }
    }); // end site setting query
});

// Updates event
router.post("/update_event", (req, res, next) => {
  if (!req.body.published) {
    req.body.published = 0;
  }

  let dateEdited = new Date();
  dateEdited = util.formatDate(dateEdited);

  query = "UPDATE events SET title= ?, description=?, date_edited=?, date_event=? , num_tickets=? WHERE id=?;";
  query_parameters = [req.body.title, req.body.description, dateEdited, req.body.date_event, req.body.num_tickets, req.body.id];

  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        console.log("ERROR")
        next(err); //send the error on to the error handler
      } else {
        console.log(query_parameters);
        res.redirect("/organizer/");
      }
    }
  );
});

// Delete Event. No warning!
router.post("/delete_event", (req, res, next) => {
  query = "DELETE FROM events WHERE id=?;";
  query_parameters = [req.body.id];

  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        console.log("ERROR")
        next(err); //send the error on to the error handler
      } else {
        console.log(query_parameters);
        res.redirect("/organizer/");
      }
    }); // End delete query
});

// Publishes the event into DB
router.post("/publish_event", (req, res, next) => {
  let datePublished = new Date();
  datePublished = util.formatDate(datePublished);


  query = "UPDATE events SET published=1, date_published=?  WHERE id=?;";
  query_parameters = [datePublished, req.body.id];


  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        console.log("ERROR")
        next(err); //send the error on to the error handler
      } else {
        res.redirect("/organizer/");
        next(); // TODO: what do?
      }
    }
  );
});




router.get('/view_bookings/:event_id', function (req, res) {
  let data = {};

  // // there is a ':' in front. TODO: why?
  let event_id = req.params.event_id[1];
  data.event_id = event_id;


  console.log("View booking");

  let query = "SELECT title, description, heading FROM site_settings where name='organizer_view_bookings'";
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
              // console.log("Event data:", data);


              //let queryView = 'SELECT * FROM events WHERE id == "' + event_id + '";';
              let query = 'SELECT * from booking_view where event_id="' + event_id + '";';
              //console.log(query);

              // console.log("Q: ", queryEvent);
              global.db.all(query,
                function (err, result) {
                  if (err) {

                    // do something if error from lab: res.redirect("/");
                    next(err); //send the error on to the error handler
                  } else {


                    data.view = result;



                    //console.log(data);
                    res.render("organizerViewBooking.ejs", data);
                  }



                });


              //              res.render("organizerViewBooking.ejs", data);
            }



          });
      }
    }

  );
});






module.exports = router;