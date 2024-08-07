import { Router } from 'express'
import { loginUser } from '../controllers/auth.controller'
import { createUser } from '../controllers/user.controller'

const route = Router()

route.post('/login', loginUser)
route.post('/register', createUser)

export default route
