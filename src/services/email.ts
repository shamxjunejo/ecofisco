import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/config';
import { format } from 'date-fns';

interface EmailData {
  to: string;
  subject: string;
  html: string;
}

/**
 * Send an email using Firebase functions (to be implemented later)
 * For now, we'll just store the email in Firestore
 */
export const sendEmail = async (emailData: EmailData): Promise<void> => {
  try {
    // Store the email in Firestore first
    await addDoc(collection(db, 'emails'), {
      ...emailData,
      status: 'pending',
      createdAt: new Date().toISOString()
    });
    
    console.log('Email added to the queue:', emailData.subject);
    
    // In a real implementation, we would trigger a cloud function to send the email
    // For example:
    // const sendEmailFunction = httpsCallable(functions, 'sendEmail');
    // await sendEmailFunction(emailData);
  } catch (error) {
    console.error('Error queuing email:', error);
    throw new Error('Failed to send email');
  }
};

/**
 * Generate and send a meeting confirmation email with Zoom details
 */
export const sendAppointmentConfirmation = async (
  name: string,
  email: string,
  date: Date,
  timeSlot: string,
  meetingType: string,
  zoomDetails?: {
    id: string;
    join_url: string;
    password: string;
  }
): Promise<void> => {
  const formattedDate = format(date, 'EEEE, MMMM d, yyyy');
  
  let meetingInfo = '';
  if (meetingType === 'zoom' && zoomDetails) {
    meetingInfo = `
      <div style="margin-top: 20px; margin-bottom: 20px; padding: 15px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0284c7;">Zoom Meeting Details</h3>
        <p>Join the meeting by clicking this link: <a href="${zoomDetails.join_url}" target="_blank">${zoomDetails.join_url}</a></p>
        <p><strong>Meeting ID:</strong> ${zoomDetails.id}</p>
        <p><strong>Passcode:</strong> ${zoomDetails.password}</p>
      </div>
    `;
  } else if (meetingType === 'phone') {
    meetingInfo = `
      <div style="margin-top: 20px; margin-bottom: 20px; padding: 15px; background-color: #f0f9ff; border: 1px solid #bae6fd; border-radius: 8px;">
        <h3 style="margin-top: 0; color: #0284c7;">Phone Call Details</h3>
        <p>Our consultant will call you at the scheduled time.</p>
        <p>Please ensure your phone is available to receive calls.</p>
      </div>
    `;
  }
  
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Appointment Confirmation</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #1e40af; margin-bottom: 10px;">Your Appointment is Confirmed</h1>
        <p style="font-size: 18px; color: #4b5563;">Thank you for scheduling a consultation with E-Co FISCO!</p>
      </div>
      
      <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="margin-top: 0; color: #1f2937;">Appointment Details</h2>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${timeSlot}</p>
        <p><strong>Type:</strong> Free 30-minute consultation</p>
        <p><strong>Meeting Method:</strong> ${meetingType === 'zoom' ? 'Zoom Video Call' : 'Phone Call'}</p>
      </div>
      
      ${meetingInfo}
      
      <div style="margin-top: 30px;">
        <h3 style="color: #1f2937;">What to Expect</h3>
        <p>During this 30-minute consultation, we will:</p>
        <ul>
          <li>Discuss your needs and how we can assist you</li>
          <li>Answer your questions about our services</li>
          <li>Provide initial guidance on your situation</li>
        </ul>
        <p>If you need to reschedule or cancel your appointment, please contact us as soon as possible.</p>
      </div>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #d1d5db; text-align: center; font-size: 14px; color: #6b7280;">
        <p>E-Co FISCO Immigration & Tax Consulting</p>
        <p>For any questions, reply to this email or call us.</p>
      </div>
    </body>
    </html>
  `;
  
  await sendEmail({
    to: email,
    subject: `Your appointment with E-Co FISCO on ${formattedDate}`,
    html,
  });
}; 