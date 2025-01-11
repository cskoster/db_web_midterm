[[DB UML]]

- [x] create site settings table
- [x] add organizer_home row
- [x] add home page row
- [x] add edit Event page row
- [x] add site settings page row
- [x] add attendee home page row
- [x] add attendee event page row
- [x] add site settings form for home page
- [x] populate site setting  home page form w data
- [x] check home page updates
- [x] populate form data with current settings
- [x] remove old row from db
- [x] add site settings form for organizer page
- [x] populate site setting  organizer page form w data
- [x] check organizer page updates
- [x] remove old row from db
- [x]  populate form data with current settings
- [x] add site settings form for edit event page
- [x] remove old row from db
- [x] populate site setting  edit event page form w data
- [x] add site settings form for Site Settings page
- [x] populate site setting  Site Settings page form w data
- [x] check Site Settings page updates
- [x] remove old row from db
- [x]  populate form data with current settings
- [x] add site settings form for Attendee page
- [x] populate site setting  Attendee page form w data
- [x] check Attendee page updates
- [x] remove old row from db
- [x]  populate form data with current settings
- [x] add site settings form for Attendee Event page
- [x] populate site setting  Attendee Event page form w data
- [x] check Attendee  Event page updates
- [x]  populate form data with current settings

- [x] adding individual siteSetting form for home page
- [x] add route for siteSetting form for home page
- [x] test individual siteSetting form for home page

- [x] adding individual siteSetting form for organizer home
- [x] add route for siteSetting form for organizer home
- [x] test individual siteSetting form for organizer home

- [x] adding individual siteSetting form for organizer edit event page
- [x] add route for siteSetting form for organizer edit event page
- [x] test individual siteSetting form for organizer edit event page

- [x] adding individual siteSetting form for attendee page
- [x] add route for siteSetting form for attendee page
- [x] test individual siteSetting form for attendee page

- [x] adding individual siteSetting form for attendee edit event page
- [x] add route for siteSetting form for attendee edit event page
- [x] test individual siteSetting form for attendee edit event page

- [x] adding individual siteSetting form for siteSetting page
- [x] add route for siteSetting form for siteSetting page
- [x] test individual siteSetting form for siteSetting page


- [x] make event table
- [x] make add event form to edit events
- [x] update db from edit events
- [ ] update db publish from editEvents

- [ ] adding validation for siteSetting form for organizer home
- [ ] adding validation for siteSetting form for  home page
- [ ]  adding validation for siteSetting form for organizer edit event page
- [ ] adding validation for siteSetting form for attendee home page
- [ ] adding validation for siteSetting form for attendee edit event page

at: oranizer.js line 126
https://www.geeksforgeeks.org/how-to-use-array-of-objects-in-ejs-template-engine/

use the foreach loop to populate the forms

have multiple forms populated each with own endpoint.

https://www.reddit.com/r/node/comments/qrv1qd/can_i_send_more_than_one_dataset_to_an_ejs_file/

put each row like this:
Yes, like so { data: { arrayStuff: […], yourString: “Hello World” }}


- [ ] error handeling: redirect to siteSetting with message
- [x] move appropriate items to Organizer Main
- [x] Title for the Events there ie: fishing, yoga
- [x] "create new event" button

- [x] ● A heading which indicates that this is the Organiser Home Page  
- [x] ● It should be accessed through a URL which is distinct from the Attendee Home Page  
- [x] ● It should display the event manager name and description. For example “Stretch Yoga” and  
- [x] “Yoga classes for all ages and abilities”.  
- [x] ● It should have a link which points to the Site Settings Page  
- [x] ● It should have a “Create New Event” button  
- [x] ○ When pressed this should create a new draft event and redirect to it’s edit page  
- [x] ● It should display a dynamically populated list of published events  
- [ ] ○ The list should display useful information about the events including the title, date,  
- [ ] when they were created and published and the number of each type of ticket for  
- [ ] sale  
- [ ] ○ For each event the list should display a sharing link which points to the  
- [ ] relevant Attendee Home Page  
- [ ] ○ For each event there should be a delete button. When pressed this should:  
- [ ] ■ Remove the event from the database  
- [ ] ■ Reload the page to display the updated information  
- [ ] ● It should display a dynamically populated list of draft events  
- [ ] ○ The list should display useful information about the events including the title, date,  
- [ ] when they were created and published and the number of each type of ticket for  
- [ ] sale  
- [ ] ○ Each event in the list should be accompanied by a link which points to its edit page  
- [ ] ○ For each event there should be a publish button. When pressed this should:  
- [ ] ■ Update the event’s state from draft to published  
- [ ] ■ Timestamp the publication date  
- [ ] ■ Reload the page to display the updated information  
- [ ] ○ For each event there should be a delete button. When pressed this should:  
- [ ] ■ Remove the event from the database  
- [ ] ■ Reload the page to display the updated information


Bootstrap template stuff:
- [ ] add title and heading and description back to organizerHome

at Site settings in instructions

Bootstrap:
https://www.geeksforgeeks.org/how-to-add-bootstrap-in-a-project/




TODO: remove write pemissions from the site_settings table so title and name dont change


https://www.reddit.com/r/node/comments/qrv1qd/can_i_send_more_than_one_dataset_to_an_ejs_file/

Yes, like so { data: { arrayStuff: […], yourString: “Hello World” }}