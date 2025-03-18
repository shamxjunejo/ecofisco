import axios from 'axios';

// Zoom API credentials
const ZOOM_ACCOUNT_ID = 'jAu7wyGzQgialdIYo2IQ9w';
const ZOOM_CLIENT_ID = 'ADYvXB0TVSnIvOrTINVsQ';
const ZOOM_CLIENT_SECRET = 't6Zb44gL5DOPgLt80suCqRhEae5IyCHq';

// Token storage
let accessToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * Get or refresh the Zoom OAuth token
 */
export const getZoomToken = async (): Promise<string> => {
  // Check if we have a valid token
  const now = Date.now();
  if (accessToken && tokenExpiry > now) {
    return accessToken;
  }
  
  try {
    // Use Client Credentials flow to get a server-to-server token
    const response = await axios({
      method: 'post',
      url: 'https://zoom.us/oauth/token',
      params: {
        grant_type: 'client_credentials',
        account_id: ZOOM_ACCOUNT_ID
      },
      headers: {
        'Authorization': `Basic ${btoa(`${ZOOM_CLIENT_ID}:${ZOOM_CLIENT_SECRET}`)}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    
    // Store token and expiry
    accessToken = response.data.access_token;
    // Set expiry time with a small buffer (5 minutes)
    tokenExpiry = now + (response.data.expires_in * 1000) - (5 * 60 * 1000);
    
    // Ensure we don't return null
    if (!accessToken) {
      throw new Error('Received invalid token from Zoom');
    }
    
    return accessToken;
  } catch (error) {
    console.error('Error getting Zoom token:', error);
    throw new Error('Failed to authenticate with Zoom');
  }
};

/**
 * Create a Zoom meeting
 */
export const createZoomMeeting = async (
  topic: string,
  startTime: string,
  duration: number = 30,
  timezone: string = 'Asia/Karachi', // Pakistan timezone
  agenda: string = ''
): Promise<{
  id: string;
  join_url: string;
  password: string;
  start_url: string;
}> => {
  try {
    const token = await getZoomToken();
    
    const response = await axios({
      method: 'post',
      url: 'https://api.zoom.us/v2/users/me/meetings',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: {
        topic,
        type: 2, // Scheduled meeting
        start_time: startTime,
        duration,
        timezone,
        agenda,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: true,
          mute_upon_entry: false,
          waiting_room: false,
          auto_recording: 'none'
        }
      }
    });
    
    return {
      id: response.data.id,
      join_url: response.data.join_url,
      password: response.data.password,
      start_url: response.data.start_url
    };
  } catch (error) {
    console.error('Error creating Zoom meeting:', error);
    throw new Error('Failed to create Zoom meeting');
  }
};

/**
 * Format a date for the Zoom API (ISO format with timezone)
 */
export const formatZoomDate = (date: Date, time: string): string => {
  // Parse the time string (format: "10:00 AM")
  const [timeStr, period] = time.split(' ');
  let [hours, minutes] = timeStr.split(':').map(Number);
  
  // Convert to 24-hour format if needed
  if (period.toLowerCase() === 'pm' && hours < 12) {
    hours += 12;
  } else if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }
  
  // Set the time on the date
  const meetingDate = new Date(date);
  meetingDate.setHours(hours, minutes, 0, 0);
  
  // Return ISO string
  return meetingDate.toISOString();
}; 