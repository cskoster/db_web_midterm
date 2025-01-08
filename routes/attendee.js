/**
 * organizer.js
 * Routes for:
 *  Organizer main page
 *  Organizer setting page
 *  Organizer edit event page
 */


const express = require("express");
const router = express.Router();

// Organizer Home
router.get("/home", function (req, res) {
  res.render("organizerHome.ejs")
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