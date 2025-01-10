/**
 * organizer.js
 * Routes for:
 *  Organizer main page
 *  Organizer setting page
 *  Organizer edit event page
 */


const express = require("express");
const router = express.Router();

// // Organizer Home
// router.get("/", function (req, res) {
//   res.render("organizerHome.ejs")
// });


// Organizer Home
router.get("/", function (req, res) {
  let query = "SELECT title, desc, heading FROM site_settings where name='organizer_home_page'";

  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {
        // res.json(rows); // render page as simple json
        //console.log(result)
        // res.send(result[0])

        res.render("organizerHome.ejs", result[0])
      }
    }
  );
});


// TODO: passing the tablename is not so good, as we write to it
// ALTERNATE: hard code the wole thing so we dont need to pass the table name
// then need to write 6 forms, 6 blocks like below.
router.post("/update_site_settings", (req, res, next) => {
  query = "UPDATE site_settings SET 'heading'= ?,'desc'= ? WHERE name= ?";
  console.log("df : ", req.body.name)
  query_parameters = [req.body.heading, req.body.desc, req.body.name];
  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        //res.send(`New data inserted @ id ${this.lastID}!`);
        res.redirect("/organizer/siteSettings");
        //next();
      }
    }
  );
});


router.get("/siteSettings", function (req, res) {
  let query = " SELECT title, desc, heading, name FROM site_settings WHERE name='home_page'  OR name='organizer_home_page'  OR name='edit_event_page' OR name='site_settings_page' OR name='attendee_page' OR name='attendee_events_page';";

  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {
        console.log(err);
        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {
        // res.json(rows); // render page as simple json
        //console.log(result)
        // res.send(result[0])

        // another query for the desc and heading will be tricky
        //let query = "SELECT title, desc, heading FROM site_settings where name='site_settings_page'";

        res.render("siteSettings.ejs", { formData: result });
      }
    }
  );

});



// Organizer Edit event Home
// router.get("/editEvent", function (req, res) {
router.get("/events", function (req, res) {
  let query = "SELECT title, desc, heading FROM site_settings where name='edit_event_page'";
  let queryEvent = 'SELECT * FROM events WHERE published not NULL;'
  let data = {};
  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        // ok works
        data.page = result[0];

        // TODO: better way?
        // This is messy and there should be a better way.
        global.db.all(queryEvent,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {

              // ok works
              data.event = result;
              console.log(data);
              res.render("organizerEvent.ejs", data)
            }
          }
        ); // END second query
      }
    }
  );

});

router.post("/create_event", (req, res, next) => {
  let dateEdited = new Date();
  let query = "INSERT INTO events (title, desc, published, date_edited,date_published) VALUES (?,?,?,?,?)";
  query_parameters = [req.body.title, req.body.desc, "NULL", dateEdited, "NULL"];

  // // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {
        res.redirect("/organizer/events");
        //next();
      }
    }
  );
});





module.exports = router;