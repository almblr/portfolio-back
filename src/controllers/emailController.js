import { sendEmail } from '../api/gmail/send-email.js'

const emailConstroller = {
    sendEmail: async (req, res) => {
    try {
      const { email, message } = req.body
      const response = await sendEmail(email, message)
      return res.status(200).json({ emailId: response.id })
    } catch (error) {
        console.log(error);
    }
  },
}

export default emailConstroller