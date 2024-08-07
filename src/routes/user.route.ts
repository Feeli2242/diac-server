import { Router } from 'express'
import {
	createUser,
	deleteUser,
	getUsers,
	updateUser,
} from '../controllers/user.controller'

const route = Router()

route.get('/', getUsers)
route.post('/', createUser)
route.put('/', updateUser)
route.delete('/:id', deleteUser)

export default route
