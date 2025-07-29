import { sendEmail } from '../api/gmail/send-email.js'

const emailConstroller = {
    sendEmail: async (req, res) => {
    try {
      const { name, email, message } = req.body
      const response = await sendEmail(name, email, message)
      return res.status(200).json({ emailId: response.id })
    } catch (error) {
        console.log(error);
    }
  },
}

export default emailConstroller