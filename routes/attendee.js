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
  res.render("attendeeHome.ejs")
});

// Attendee Event page
router.get("/event", function (req, res) {
  res.render("attendeeEvent.ejs")
});

module.exports = router;