/**
 * main.js
 * 
 * route for the main page
 */

const express = require("express");
const router = express.Router();

router.get("/main", function (req, res) {
  res.render("index.html")
});