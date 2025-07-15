import { google } from 'googleapis'
import process from 'process';
import dotenv from 'dotenv';
dotenv.config();

const clientId = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const refreshToken = process.env.GOOGLE_REFRESH_TOKEN

// For fully authorized with token generation, refer to https://github.com/googleworkspace/node-samples/blob/main/gmail/quickstart/index.js
async function authorize() {
  console.log(clientId);
  try {
    const credentials = {
      type: 'authorized_user',
      client_id: clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    }
    const client = google.auth.fromJSON(credentials)
    return client
    return 'toto'
  } catch (error) {
    console.log(error)
  }
}

export const createMimeMessage = async (email, body) => {
  const messageParts = [
    'From: Moi <birkyo@gmail.com>',
    `To: <birkyo@gmail.com>`,
    'Content-Type: multipart/mixed; boundary="boundary"',
    'MIME-Version: 1.0',
    `Subject: Contact Freelance de ${email}`,
    '',
    '--boundary',
    'Content-Type: text/html; charset=utf-8',
    '',
    body,
    ''
  ]
  messageParts.push('--boundary--');
  return messageParts.join('\n')
}

// export const sendEmail = async (subject="bonjour", body="") => {
//   try {
//     const auth = await authorize();
//     const gmail = google.gmail({ auth, version: 'v1' });
//     const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
//     const message = await createMimeMessage(utf8Subject, body);
//     const encodedMessage = Buffer.from(message)
//       .toString('base64')
//       .replace(/\+/g, '-')
//       .replace(/\//g, '_')
//       .replace(/=+$/, '');

//     const res = await gmail.users.messages.send({
//       userId: 'me',
//       requestBody: {
//         raw: encodedMessage,
//       },
//     });
//     console.log('Message ID:', res.data.id);
//   } catch (error) {
//     console.log('Failed to send message :', error.response?.data || error);
//   }
// };

export const sendEmail = async (subject="bonjour", body="") => {
  try {
    const auth = await authorize();
    const gmail = google.gmail({ auth, version: 'v1' });
    const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
    const message = await createMimeMessage(utf8Subject, body);
    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    const res = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: encodedMessage,
      },
    });
    console.log('Message ID:', res.data.id);
  } catch (error) {
    console.log('Failed to send message :', error.response?.data || error);
  }
};
