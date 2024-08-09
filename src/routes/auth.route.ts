import { Router } from 'express'
import {
	loginUser,
	verifyTokenController,
} from '../controllers/auth.controller'
import { createUser } from '../controllers/user.controller'
import { verifyToken } from '../middlewares/verifyToken'

const route = Router()

route.post('/login', loginUser)
route.post('/register', createUser)
route.get('/verify', verifyToken, verifyTokenController)

export default route
