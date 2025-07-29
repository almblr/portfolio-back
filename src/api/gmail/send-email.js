
import { google } from 'googleapis'
import dotenv from 'dotenv';
import authorize from './auth.js';
import createMimeMessage from '../../utils/emailFormatter.js'
import mimeEncoder from '../../utils/mimeEncoder.js'
dotenv.config();

export const sendEmail = async (name, email, message) => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ auth, version: 'v1' });
    const mimeMessage = await createMimeMessage(name, email, message);
    return await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: mimeEncoder(mimeMessage),
      },
    });
  } catch (error) {
    console.log('Failed to send message :', error.response?.data || error);
  }
};
