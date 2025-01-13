

const express = require("express");
const router = express.Router();
const util = require('./utils');


/**  Attendee Home */
router.get("/", function (req, res) {

  let query = "SELECT title, description, heading FROM site_settings where name='attendee_page'";

  // data object, gets passed to ejs template
  let data = {};

  global.db.all(query,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {


        data.page = result[0]; // only one page with this name. db constraint
        let queryPublished = 'SELECT * FROM events WHERE published == 1;'
        global.db.all(queryPublished,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {

              result.sort(util.compare);
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
router.get('/event/:event_id', function (req, res) {
  let data = {};

  // Fetch data from the GET request
  let event_id = req.params.event_id[1];
  data.event_id = event_id;

  let query = "SELECT title, description, heading FROM site_settings where name='attendee_events_page'";

  // Execute the query and render the page with the results
  global.db.all(query,
    function (err, result) {
      if (err) {
        next(err); //send the error on to the error handler
      } else {

        // site related templates
        data.page = result[0];

        let queryEvent = 'SELECT * FROM events WHERE id == "' + event_id + '";';

        global.db.all(queryEvent,
          function (err, result) {
            if (err) {

              // do something if error from lab: res.redirect("/");
              next(err); //send the error on to the error handler
            } else {
              data.event = result[0];
              res.render("attendeeEvent.ejs", data);
            }
          });
      }
    }
  );
});

/**Put the booking into the DB */
router.post("/make_booking", (req, res, next) => {
  console.log("make Booking");
  let data = {};

  let dateBooked = new Date();
  dateBooked = util.formatDate(dateBooked);

  // For Template
  data.name = req.body.name;
  data.email = req.body.email;
  data.num_tickets = req.body.num_tickets;
  data.event_id = req.body.event_id;
  data.event_title = req.body.event_title;
  data.description = req.body.event_description;

  let userName = req.body.name;
  let query = "SELECT * FROM email_accounts INNER JOIN users ON email_accounts.user_id = users.user_id WHERE user_name=?;";
  let query_parameters = [userName];

  // Check if user has an account
  global.db.all(query, query_parameters,
    function (err, result) {
      if (err) {

        // do something if error from lab: res.redirect("/");
        next(err); //send the error on to the error handler
      } else {

        // Empty is no such user
        data.nameLookup = result; // only one page with this name. db constraint

        // if no user
        if (data.nameLookup.length == 0) {
          let query = "INSERT into users (user_name) VALUES (?)";
          let query_parameters = [data.name];

          // INSERT new user
          global.db.all(query, query_parameters,
            function (err, result) {
              if (err) {

                // do something if error from lab: res.redirect("/");
                next(err); //send the error on to the error handler
              } else {

                // NEED TO PUT THE EMAIL ADDRESS IN NOW
                // get the user_id
                let query = "SELECT user_id from users where user_name=?";
                let query_parameters = [userName];

                global.db.all(query, query_parameters,
                  function (err, result) {
                    if (err) {

                      // do something if error from lab: res.redirect("/");
                      next(err); //send the error on to the error handler
                    } else {

                      data.nameLookup = result[0]; // only one page with this name. db constraint

                      // insert into email_accounts
                      let query = "INSERT INTO email_accounts (user_id, email_address) VALUES (?,?)";
                      let query_parameters = [data.nameLookup.user_id, data.email];
                      global.db.all(query, query_parameters,
                        function (err, result) {
                          if (err) {

                            // do something if error from lab: res.redirect("/");
                            next(err); //send the error on to the error handler
                          } else {

                            let query = "SELECT * FROM email_accounts WHERE user_id=?";
                            let query_parameters = [data.nameLookup.user_id];
                            global.db.all(query, query_parameters,
                              function (err, result) {
                                if (err) {

                                  // do something if error from lab: res.redirect("/");
                                  next(err); //send the error on to the error handler
                                } else {
                                  // get the email_account_id
                                  data.email_account_id = result[0].email_account_id;

                                  let query = "INSERT INTO bookings (email_account_id, event_id,num_tickets,date_booked) VALUES (?,?,?,?)";
                                  let query_parameters = [data.email_account_id, data.event_id, data.num_tickets, dateBooked];
                                  global.db.all(query, query_parameters,
                                    function (err, result) {
                                      if (err) {

                                        // do something if error from lab: res.redirect("/");
                                        next(err); //send the error on to the error handler
                                      } else {

                                        let query = "SELECT title, description, heading FROM site_settings where name='attendee_booked_page'";
                                        global.db.all(query,
                                          function (err, result) {
                                            if (err) {

                                              // do something if error from lab: res.redirect("/");
                                              next(err); //send the error on to the error handler
                                            } else {

                                              data.page = result[0]; // only one page with this name. db constraint
                                              console.log(data);
                                              res.render("attendeeBooked", data);
                                            }
                                          }); // End Site setting query
                                      }
                                    });  // End make booking query
                                }
                              }); // End email query
                          }
                        }); // End insert into email query
                    }
                  }); // End get user_id query
              };
            }); // End insert into users query
        }
      }
    }); // End check if user exits query
});  // End route

module.exports = router;