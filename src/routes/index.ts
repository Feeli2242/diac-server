import { Router } from 'express'
import roleRoutes from './role.route'
import userRoutes from './user.route'
import authRoutes from './auth.route'

const route = Router()

route.use('/role', roleRoutes)
route.use('/user', userRoutes)
route.use('/auth', authRoutes)

export default route
