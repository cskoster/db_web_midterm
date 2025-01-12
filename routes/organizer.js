/**
 * organizer.js
 * Routes for:
 *  Organizer main page
 *  Organizer setting page
 *  Organizer edit event page
 * TODO add all the routes
 */


const express = require("express");
const router = express.Router();


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

        /* 
          NOTE: this could be done by "SELECT * FROM events;"
          However, this would put login in the view in violateion of
          Separation of concern (SOC).
        */
        let queryUnpublished = 'SELECT * FROM events WHERE published == 0;'
        global.db.all(queryUnpublished,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {
              data.unPublished = result;
              // start new
              let queryPublished = 'SELECT * FROM events WHERE published == 1;';
              global.db.all(queryPublished,
                function (err, result) {
                  if (err) {

                    // do something if error from lab: res.redirect("/");
                    next(err); //send the error on to the error handler
                  } else {
                    // add dat from query
                    data.published = result;
                    ///console.log("HOME: ", data);
                    res.render("organizerHome.ejs", data)
                  }
                });
              // end new
              // add "event" to template object

              // res.render("organizerHome.ejs", data)
            }
          }
        ); // END second query
      }
    }
  );

});


// Set up title, heading and description of the site pages
router.get("/siteSettings", function (req, res) {
  let query = " SELECT title, description, heading, name FROM site_settings WHERE name='home_page'  OR name='organizer_home_page'  OR name='edit_event_page' OR name='site_settings_page' OR name='attendee_page' OR name='attendee_events_page';";

  global.db.all(query,
    function (err, result) {
      if (err) {
        //console.log(err);
        // do something if error from lab: res.redirect("/");

        // This happens if there is no database
        next(err); //send the error on to the error handler
      } else {
        res.render("siteSettings.ejs", { formData: result });
      }
    }
  );

});


// TODO: passing the tablename is not so good, as we write to it
// ALTERNATE: hard code the wole thing so we dont need to pass the table name
// then need to write 6 forms, 6 blocks like below.
//  NOTE way to do this is below
router.post("/update_site_settings", (req, res, next) => {
  query = "UPDATE site_settings SET 'heading'= ?,'description'= ? WHERE name= ?";
  // console.log("df : ", req.body.name)
  query_parameters = [req.body.heading, req.body.description, req.body.name];
  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.redirect("/organizer/siteSettings");
        //next(); // TODO: what do?
      }
    }
  );
});


// Organizer Create Event Home
/** GET a create new event */
router.get("/create_event", function (req, res) {

  let data = {};
  let query = "SELECT title, description, heading FROM site_settings where name='create_event_page'";
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        // ok works
        //        data.event = result;
        data.page = result[0]; // only one page with this name. db constraint
        res.render("organizerCreateEvent.ejs", data);
      }
    }
  ); // END second query


});

/**POST a create new event */
router.post("/create_event", (req, res, next) => {
  //let dateEdited = Date().split(" GMT")[0];

  let dateEdited = new Date();

  dateEdited = formatDate(dateEdited);
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
        //next();
      }
    }
  );
});

// Organizer Edit event page
router.post("/edit_event", function (req, res) {
  let query = "SELECT title, description, heading FROM site_settings where name='edit_event_page'";


  let data = {};

  // second query
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        data.page = result[0];

        // second query

        // TODO use this, like in update_event below
        // query = "UPDATE events SET 'title'= ?,'description'= ? WHERE = ?";
        // let queryEvent = `SELECT * FROM events WHERE id=${req.body.id};`

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
          }
        ); // END second query
      }
    }
  );

});


router.post("/update_event", (req, res, next) => {
  if (!req.body.published) {
    // console.log("null;")
    req.body.published = 0;
  }

  console.log("ID: ", req.body.id)

  let dateEdited = new Date();
  dateEdited = formatDate(dateEdited);

  // HERE:
  /*
  This is the problem: we cannot put placeholder in the date picker.
  WE must redo the create event to ask for date in yyyy-mm-dd formatm and a separate field
  for hh:mm format.

  Just pass the string for new

  */

  // ok this is what the form sent
  //  console.log("here:", req.body.title, req.body.description, dateEdited, req.body.date_event, req.body.num_tickets, req.body.id);


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
        //next(); // TODO: what do?
      }
    }
  );
});

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
        next(); // TODO: what do?
      }
    }
  );
});


router.post("/publish_event", (req, res, next) => {
  console.log("publish")
  query = "UPDATE events SET published=1  WHERE id=?;";
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
        next(); // TODO: what do?
      }
    }
  );
});



/**Pass in a date object i. dateObject = new Data() 
 * Returns date in: yyyy-mm-ddThh:mm format
*/
function formatDate(dateObject) {
  let d = dateObject.toJSON();

  let splitDate = d.split(":");
  let newDate = splitDate[0] + ":" + splitDate[1];
  return newDate;
}




module.exports = router;