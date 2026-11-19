GlambyMash

A responsive portfolio and booking website for a freelance makeup artist, built for a real client.

Live site: https://glambymash.netlify.app

Home page

Features
Responsive design for phones, tablets and desktops, with a mobile hamburger menu
Services menu listing seven services (bridal, reception, engagement, soft glam, haldi, Arabian looks, party)
Photo gallery with a full-size lightbox viewer (keyboard and screen-reader friendly)
Booking form with client-side validation (name, Indian mobile number, service, future event date)
Server-side validation of every booking before it is saved
Booking storage and alerts: each request is added to a Google Sheet and emailed to the artist
Accessibility basics: semantic HTML, labelled form fields, focus styles, reduced-motion support
SEO basics: page description, link-preview tags and favicon
How the booking flow works
Visitor fills the form
        │
        ▼
JavaScript validates the input (script.js)
        │  fetch POST
        ▼
Google Apps Script web app
  • re-validates every field on the server
  • rejects unknown services and past dates
  • protects the sheet against formula injection
        │
        ├──► appends a row to a Google Sheet
        └──► emails the artist

The page only shows a success message after the server confirms the booking was saved.

Tech stack
HTML5, CSS3 (custom properties, Grid, Flexbox, media queries)
Vanilla JavaScript (fetch, async/await, DOM)
Google Apps Script and Google Sheets for the booking backend
Netlify for hosting, GitHub for version control
Project structure
├── index.html
├── style.css
├── script.js
├── images/
└── favicon and manifest files
Run it locally
Clone the repository.
Open index.html in a browser, or use the VS Code Live Server extension.
The booking form sends data to a private Google Apps Script deployment, so it will not save bookings unless you set up your own: create a Google Sheet with the headers Timestamp, Name, Phone, Service, Date, Venue, Message, add an Apps Script web app that appends a row, and put its URL in script.js.
Roadmap
[ ] Node.js and Express backend with a PostgreSQL database
[ ] Date and time slots that prevent double-booking
[ ] Secure admin dashboard to manage bookings, gallery photos and prices
[ ] Confirmation emails to clients
[ ] Automated tests
About

Built by [Sarah Jamshed] as a B.Tech CSE project for my sister's makeup business.
