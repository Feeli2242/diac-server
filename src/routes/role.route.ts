import { Router } from 'express'
import { createRole, getAllRoles } from '../controllers/role.controller'

const route = Router()

route.get('/', getAllRoles)
route.post('/', createRole)

export default route
