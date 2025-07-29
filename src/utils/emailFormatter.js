const personalEmail = process.env.PERSONAL_EMAIL

const createEmailSubject = (name) => {
  const subject = `Contact Freelance de ${name}`;
  const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
  return `Subject: ${utf8Subject}`;
};

const createEmailBody = (message, email) => {
  return `
    <div>
      <p>${message}</p>
      <strong>Mail envoyé par : ${email}</strong>
    </div>
  `
};

export const createMimeMessage = async (name, email, message) => {
  const messageParts = [
    `From: Moi <${personalEmail}>`,
    `To: <${personalEmail}>`,
    'Content-Type: multipart/mixed; boundary="boundary"',
    'MIME-Version: 1.0',
    createEmailSubject(name),
    '',
    '--boundary',
    'Content-Type: text/html; charset=utf-8',
    '',
    createEmailBody(message, email),
    '',
    '--boundary--'
  ]
  return messageParts.join('\n')
}

export default createMimeMessage
