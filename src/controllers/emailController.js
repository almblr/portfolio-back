import { sendEmail } from '../api/gmail/send-email.js'

const emailConstroller = {
    sendEmail: async (req, res) => {
    try {
      const { name, email, message } = req.body
      const response = await sendEmail(name, email, message)
      if(!response) {
        return res.status(500).json({ message: 'Email service responded with failure' })
      }
      return res.status(200).json({ message: 'Mail sent successfully' })
    } catch (error) {
        console.log(error);
         return res.status(500).json({ error: 'Internal Server Error' })
    }
  },
}

export default emailConstroller