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



/**
 * @desc Add a new user to the database based on data from the submitted form
 */
router.post("/home_page_settings", (req, res, next) => {
  query = "UPDATE site_settings SET  'title'= ?,'heading'= ?,'desc'= ? WHERE name= ?";
  query_parameters = [req.body.home_page_title, req.body.home_page_header, req.body.home_page_desc, 'home_page'];

  // Execute the query and send a confirmation message
  global.db.run(query, query_parameters,
    function (err) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {

        // remove the old one

        res.send(`New data inserted @ id ${this.lastID}!`);
        next();
      }
    }
  );
});

/*
SELECT title, desc, heading FROM site_settings 
where 
name='home_page'  
 OR name='organizer_home_page' 
OR name='edit_event_page' 
OR name='site_settings_page'
OR name='attendee_page'
OR name='attendee_events_page';
*/

// Site Settings
router.get("/siteSettings", function (req, res) {
  res.render("siteSettings.ejs")
});






// // Site Settings
// router.get("/editEvent", function (req, res) {
//   res.render("editEvent.ejs")
// });

module.exports = router;