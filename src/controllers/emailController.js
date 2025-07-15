import { sendEmail } from '../api/gmail/send-email.js'

const emailConstroller = {
    sendEmail: async (req, res) => {
    try {
      const { email, message } = req.body
      await sendEmail(email, message)
      return res.status(200).json({ success: true })
    } catch (error) {
        console.log(error);
    }
  },
}

export default emailConstroller