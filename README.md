# Eco FISCO Appointment Booking System

This is an appointment booking system for Eco FISCO with Zoom integration.

## Features

- Calendar-based appointment booking
- Time slot selection
- Zoom meeting integration
- Email confirmations
- Mobile responsive design

## Zoom API Integration

The system integrates with Zoom to automatically create meetings for scheduled appointments. 

### Setup

1. Create a Zoom Developer account at https://marketplace.zoom.us
2. Create a Server-to-Server OAuth app
3. Grant the following scopes:
   - `meeting:write`
   - `meeting:read`
   - `user:read`
   - `user:write`
4. Update the following credentials in `src/services/zoom.ts`:
   - `ZOOM_ACCOUNT_ID`
   - `ZOOM_CLIENT_ID`
   - `ZOOM_CLIENT_SECRET`

## Email Sending

Currently, emails are only stored in Firebase. To actually send emails, you'll need to set up Firebase Cloud Functions:

1. Initialize Firebase Functions
```
firebase init functions
```

2. Create a function to send emails (example using Nodemailer):
```javascript
// functions/index.js
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

admin.initializeApp();

// Configure email transport
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password',
  },
});

// Function to send emails
exports.sendEmail = functions.firestore
  .document('emails/{emailId}')
  .onCreate(async (snap, context) => {
    const emailData = snap.data();
    
    try {
      await transporter.sendMail({
        from: 'Eco FISCO <your-email@gmail.com>',
        to: emailData.to,
        subject: emailData.subject,
        html: emailData.html,
      });
      
      // Update status to sent
      return snap.ref.update({ status: 'sent', sentAt: admin.firestore.FieldValue.serverTimestamp() });
    } catch (error) {
      console.error('Error sending email:', error);
      return snap.ref.update({ status: 'error', error: error.message });
    }
  });
```

3. Deploy the function:
```
firebase deploy --only functions
```

## Developing Locally

1. Install dependencies:
```
npm install
```

2. Run the development server:
```
npm run dev
```

3. Open [http://localhost:5173](http://localhost:5173) in your browser. 