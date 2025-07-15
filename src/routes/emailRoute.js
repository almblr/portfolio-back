import emailController from '../controllers/emailController.js'
import Router from 'express'

const router = Router()

router.post('/email/send', emailController.sendEmail)
router.get('/email/test', (req, res) => {
  res.status(200).json({ success: 'it works' })
})

export default router
