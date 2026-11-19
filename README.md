# GlambyMash – Makeup Artist Portfolio & Booking Website

A responsive portfolio and booking website built for a freelance makeup artist as a real-world client project.

**Live Website:** [https://glambymash.netlify.app](https://glambymash.netlify.app)

**GitHub Repository:** [https://github.com/Sarahjamshed/glambymash](https://github.com/Sarahjamshed/glambymash)

## Overview

GlambyMash gives a freelance makeup artist an online presence where clients can explore her services, browse her portfolio and submit booking enquiries through an integrated form.

The project focuses on building a responsive frontend with a working booking system, including server-side validation, data storage and automated email notifications.

## Features

- **Responsive design:** Optimized for phones, tablets and desktops, with a mobile hamburger menu.
- **Services section:** Showcases seven makeup services: Bridal, Reception, Engagement, Soft Glam, Haldi, Arabian Looks and Party Makeup.
- **Interactive photo gallery:** Full-size lightbox viewer with keyboard and screen-reader support.
- **Booking form:** Collects client name, Indian mobile number, selected service, event date, venue and additional message.
- **Client-side validation:** Checks form inputs before submitting booking requests.
- **Server-side validation:** Independently validates every request, accepts only predefined services, rejects past dates, limits input length and protects against spreadsheet formula injection.
- **Google Sheets integration:** Saves every booking enquiry as a new row.
- **Email notifications:** Notifies the makeup artist when a new enquiry arrives.
- **Reliable submission feedback:** Displays a success message only after the server confirms the booking.
- **Accessibility:** Uses semantic HTML, labelled form fields, visible focus styles and reduced-motion support.
- **SEO basics:** Includes a meta description, social media link-preview tags and favicon.

## How the Booking Flow Works

```text
       Client fills out the booking form
                 |
                 v
     JavaScript validates the input
                 |
                 v
         Fetch POST request
                 |
                 v
       Google Apps Script backend
                 |
                 v
       Server-side validation
                 |
                 v
       Booking saved to Google Sheets
                 |
                 v
       Email notification sent
                 |
                 v
       Server returns a response
                 |
                 v
       Success message displayed
```

The frontend uses JavaScript's Fetch API to send booking details to a Google Apps Script web app. The backend independently validates the submitted data, stores the booking in Google Sheets and sends an email notification.

The website displays a success message only after receiving confirmation from the server.

## Key Technical Decisions

- **Google Apps Script and Sheets for the first version:** The artist needed a working booking system quickly and already uses Google tools. Google Sheets provides an easy way to manage enquiries from her phone, while email notifications keep her informed. A Node.js and PostgreSQL backend is planned as a future upgrade.

- **Validation on both client and server:** Since the Apps Script URL is accessible from the website's JavaScript, requests could bypass the form. The server therefore re-checks every field, accepts only predefined services, rejects past dates, limits input length and protects against spreadsheet formula injection.

- **Booking saved before email notification:** Booking details are saved to Google Sheets before the email notification is sent. This ensures that an email delivery failure does not prevent the booking request from being stored.

- **Reliable submission feedback:** The success message appears only after server confirmation, and the submit button is disabled while sending to prevent accidental duplicate submissions.

- **Separate account for client data:** Bookings contain names and phone numbers, so they are managed through a dedicated Google account instead of a personal account. The script is also restricted to a single spreadsheet.

- **Authentic portfolio images:** The gallery uses the artist's own makeup work, ensuring the website accurately represents her services without presenting another artist's work as hers.

## Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Website structure and semantic markup |
| CSS3 | Styling, responsive layouts, Grid, Flexbox and media queries |
| Vanilla JavaScript | DOM manipulation, event handling, validation and asynchronous requests |
| Fetch API | Communication between frontend and booking backend |
| Google Apps Script | Booking backend and server-side validation |
| Google Sheets | Booking data storage |
| Netlify | Website hosting and deployment |
| Git & GitHub | Version control and source code management |

## Project Structure

```text
GlambyMash/
│
├── index.html
├── style.css
├── script.js
├── images/
│
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png
├── site.webmanifest
│
└── README.md
```

## Run Locally

1. Clone the repository:

   ```bash
   git clone https://github.com/Sarahjamshed/glambymash.git
   ```

2. Navigate to the project directory:

   ```bash
   cd glambymash
   ```

3. Open the project in Visual Studio Code.

4. Run `index.html` using the Live Server extension or open it directly in a browser.

### Booking Backend Setup

The live website uses a Google Apps Script deployment. To enable booking submissions with your own setup:

1. Create a Google Sheet with the following column headers:

   `Timestamp, Name, Phone, Service, Date, Venue, Message`

2. Open **Extensions → Apps Script** from the spreadsheet.

3. Create a `doPost` function to process booking requests, validate the submitted data and append booking details to the sheet.

4. Configure email notifications for new booking enquiries.

5. Deploy the script as a web app with the appropriate permissions.

6. Copy the deployment URL and configure it in the `fetch()` call in `script.js`.

Without configuring your own backend, the website can still be viewed locally, but booking submissions will not be saved.

## Deployment

The website is hosted on Netlify and connected to GitHub for version control and deployment.

Changes pushed to the connected GitHub repository are automatically deployed through Netlify.

**Live Website:** [https://glambymash.netlify.app](https://glambymash.netlify.app)

## What I Learned

- **Debugging JavaScript:** A one-letter typo (`fform`) stopped the booking form from working. I used the browser's Developer Console to identify and fix the issue.
- **Apps Script deployment:** Learned that saving changes in Google Apps Script does not automatically update an existing live deployment. I had to publish a new version to apply the changes.
- **Handling client data:** Moved booking data from my personal Google account to a separate dedicated account to keep client information separate.
- **Server-side validation:** Realized that the Apps Script deployment URL is publicly accessible from frontend JavaScript, meaning requests can bypass browser validation. Added independent server-side checks to validate incoming booking requests.

## Future Improvements

- [ ] Migrate the booking backend to Node.js and Express.
- [ ] Integrate PostgreSQL for structured booking data management.
- [ ] Implement date and time slots to prevent double-booking.
- [ ] Develop a secure admin dashboard to manage bookings, gallery photos and service prices.
- [ ] Add confirmation emails for clients.
- [ ] Introduce automated testing.

## About

Developed by **Sarah Jamshed** as a real-world B.Tech CSE project for a freelance makeup artist's business.

The project demonstrates practical frontend development, backend integration, data validation and storage, deployment and version control.
