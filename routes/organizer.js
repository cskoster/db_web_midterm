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




router.post("/home_page_settings", (req, res, next) => {
  query = "UPDATE site_settings SET 'heading'= ?,'desc'= ? WHERE name= ?";
  query_parameters = [req.body.home_page_heading, req.body.home_page_desc, 'home_page'];

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

        res.render("siteSettings.ejs", { formData: result })
      }
    }
  );

});

// // Site Settings
// router.get("/siteSettings", function (req, res) {
//   res.render("siteSettings.ejs")
// });






// // Site Settings
// router.get("/editEvent", function (req, res) {
//   res.render("editEvent.ejs")
// });

module.exports = router;