-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys = ON;

BEGIN TRANSACTION;

-- Create your tables with SQL commands here (watch out for slight syntactical differences with SQLite vs MySQL)
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS email_accounts (
  email_account_id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_address TEXT NOT NULL,
  user_id INT,
  --the user that the email account belongs to
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- Insert default data (if necessary here)
-- Set up three users
INSERT INTO users ('user_name')
VALUES ('Simon Star');

INSERT INTO users ('user_name')
VALUES ('Dianne Dean');

INSERT INTO users ('user_name')
VALUES ('Harry Hilbert');

-- Give Simon two email addresses and Diane one, but Harry has none
INSERT INTO email_accounts ('email_address', 'user_id')
VALUES ('simon@gmail.com', 1);

INSERT INTO email_accounts ('email_address', 'user_id')
VALUES ('simon@hotmail.com', 1);

INSERT INTO email_accounts ('email_address', 'user_id')
VALUES ('dianne@yahoo.co.uk', 2);

-- Create Site Setting Table
CREATE TABLE IF NOT EXISTS site_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- Title in <head>
  "title" TEXT NOT NULL,
  -- Heading of page ie. <h1>Org Page</h1>
  "heading" TEXT NOT NULL,
  -- Description of page  
  "description" TEXT NOT NULL,
  -- Name of page ie. home, organizer_home, attendee_home
  "name" TEXT NOT NULL
);

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Home Page',
    'Welcome to the Home Page',
    'Link to Organizer Page Attendee Page',
    'home_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Organizer Home',
    'Organizer Home Page',
    'Weekly and Monthly Fun Run Organizer',
    'organizer_home_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Create Event Page',
    'Create a new event',
    'Make a new event!',
    'create_event_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Edit Event Page',
    'Welcome to the Edit Event Page',
    'Edit event',
    'edit_event_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Site Settings',
    'Welcome to the Site Settings Page',
    'Change the Title, main Heading, and Descriptions of pages',
    'site_settings_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Attendee Home',
    'Welcome to the Attendee Home Page',
    'Mange events',
    'attendee_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Attendee Event Page',
    'Attendee Event Page',
    'Mange events',
    'attendee_events_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Event Booked',
    'Attendee Event Booked',
    'Event was booked',
    'attendee_booked_page'
  );

INSERT INTO site_settings ('title', 'heading', 'description', 'name')
VALUES (
    'Event Bookings',
    'View Event Bookings',
    'All Bookings for event',
    'organizer_view_bookings'
  );

-- Create Event Table
CREATE TABLE IF NOT EXISTS "events" (
  "id" INTEGER PRIMARY KEY AUTOINCREMENT,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  -- 0 is FALSE, 1 is TRUE: https://www.sqlite.org/datatype3.html
  "published" INT,
  "date_created" TEXT NOT NULL,
  "date_event" TEXT NOT NULL,
  "date_edited" TEXT NOT NULL,
  "date_published" TEXT,
  "num_tickets" INT NOT NULL,
  "num_tickets_sold" INT NOT NULL
);

-- unpublished event
INSERT INTO EVENTS (
    'title',
    'description',
    'date_created',
    "date_event",
    'published',
    'date_edited',
    'date_published',
    'num_tickets',
    'num_tickets_sold'
  )
VALUES (
    'Party',
    "Bob's bday",
    -- created
    '2025-01-29T10:30',
    -- event date
    '2025-11-29T10:30',
    0,
    -- date_edited
    '2025-01-29T10:30',
    -- date_published
    NULL,
    100,
    12
  );

INSERT INTO EVENTS (
    'title',
    'description',
    'date_created',
    "date_event",
    'published',
    'date_edited',
    'date_published',
    'num_tickets',
    'num_tickets_sold'
  )
VALUES (
    'Wedding',
    "Tommy and Beth get hitched",
    -- created
    '2025-01-29T10:30',
    -- event date
    '2025-10-29T10:30',
    0,
    -- date_edited
    '2025-01-29T10:30',
    -- date_published
    NULL,
    200,
    20
  );

-- Published events
INSERT INTO EVENTS (
    'title',
    'description',
    'date_created',
    "date_event",
    'published',
    'date_edited',
    'date_published',
    'num_tickets',
    'num_tickets_sold'
  )
VALUES (
    'Run in the hills',
    "12 Km run with hills",
    -- created
    '2025-01-29T10:30',
    -- event date
    '2025-09-29T10:30',
    1,
    -- date_edited
    '2025-09-29T10:30',
    -- date_published
    '2025-08-29T10:30',
    300,
    0
  );

INSERT INTO EVENTS (
    'title',
    'description',
    'date_created',
    "date_event",
    'published',
    'date_edited',
    'date_published',
    'num_tickets',
    'num_tickets_sold'
  )
VALUES (
    'Flat run on the beach',
    "6km run in sand",
    -- created
    '2025-01-29T20:30',
    -- event date
    '2025-02-29T10:30',
    1,
    -- date_edited
    '2025-06-29T10:30',
    -- date_published 
    '2025-01-29T10:30',
    400,
    0
  );

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email_account_id INTEGER,
  -- get name from email_accounts
  -- the event being booked
  event_id INT NOT NULL,
  num_tickets INT NOT NULL,
  date_booked TEXT NOT NULL,
  --the user that the email account belongs to
  FOREIGN KEY (email_account_id) REFERENCES email_accounts(email_account_id),
  FOREIGN KEY (event_id) REFERENCES EVENTS(id)
);

-- Create view for all bookings
CREATE VIEW booking_view AS
SELECT users.user_name,
  email_accounts.email_address,
  bookings.date_booked,
  bookings.num_tickets,
  bookings.event_id
FROM EVENTS
  INNER JOIN bookings ON EVENTS.id = bookings.event_id
  INNER JOIN email_accounts ON bookings.email_account_id = email_accounts.email_account_id
  INNER JOIN users ON email_accounts.user_id = users.user_id;

COMMIT;

-- building query
-- SELECT * FROM email_accounts INNER JOIN users ON email_accounts.user_id = users.user_id WHERE user_name="tony";
--
-- ####### 
-- Get everything relevant
-- SELECT *
-- FROM EVENTS
-- INNER JOIN bookings ON EVENTS.id = bookings.event_id
-- INNER JOIN email_accounts ON bookings.email_account_id = email_accounts.email_account_id
-- INNER JOIN users ON email_accounts.user_id = users.user_id;
--
-- #######
-- Select only what we want to display
-- SELECT user_name, email_address, bookings.num_tickets,date_booked FROM events 
-- INNER JOIN bookings ON events.id=bookings.event_id 
-- INNER JOIN email_accounts ON bookings.email_account_id=email_accounts.email_account_id
-- INNER JOIN users ON email_accounts.user_id=users.user_id
-- WHERE event_id=4;