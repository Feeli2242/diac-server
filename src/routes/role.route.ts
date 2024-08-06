import { Router } from 'express'
import { createRole } from '../controllers/role.controller'

const route = Router()

route.post('/', createRole)

export default route
