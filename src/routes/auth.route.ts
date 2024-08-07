import { Router } from 'express'
import { loginUser } from '../controllers/auth.controller'

const route = Router()

route.post('/login', loginUser)

export default route
