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
  let query = "SELECT home_page_title FROM site_settings";

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

        // res.render("organizerHome.ejs", { title: "hi there" })
        res.render("organizerHome.ejs", result[0])
      }
    }
  );


  //res.render("organizerHome.ejs")
});


// Site Settings
router.get("/siteSettings", function (req, res) {
  res.render("siteSettings.ejs")
});

// Site Settings
router.get("/editEvent", function (req, res) {
  res.render("editEvent.ejs")
});

module.exports = router;