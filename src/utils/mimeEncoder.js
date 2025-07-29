const mimeEncore = (mimeMessage) => {
  return Buffer.from(mimeMessage)
  .toString('base64')
  .replace(/\+/g, '-')
  .replace(/\//g, '_')
  .replace(/=+$/, '');
}

export default mimeEncore
