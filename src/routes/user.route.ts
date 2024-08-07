import { Router } from 'express'
import {
	createUser,
	deleteUser,
	getUsers,
	updateUser,
} from '../controllers/user.controller'
import { verifyToken } from '../middlewares/verifyToken'

const route = Router()

route.get('/', verifyToken, getUsers)
route.post('/', createUser)
route.put('/', updateUser)
route.delete('/:id', deleteUser)

export default route
