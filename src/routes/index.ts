import { Router } from 'express'
import roleRoutes from './role.route'

const route = Router()

route.use('/role', roleRoutes)

export default route
