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
  "desc" TEXT NOT NULL,
  -- Name of page ie. home, organizer_home, attendee_home
  "name" TEXT NOT NULL
);

INSERT INTO site_settings ('title', 'heading', 'desc', 'name')
VALUES (
    'Organizer Home',
    'Welcome to the Organizer Home Page',
    'Link to Event Page, Draft Events, Publish event, Edit Event, and Site Settings',
    'organizer_home'
  );

COMMIT;