import emailController from '../controllers/emailController.js'
import Router from 'express'

const router = Router()

router.post('/email/send', emailController.sendEmail)

export default router
