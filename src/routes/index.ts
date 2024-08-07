import { Router } from 'express'
import roleRoutes from './role.route'
import userRoutes from './user.route'
import authRoutes from './auth.route'
import ticketRoutes from './ticket.route'

const route = Router()

route.use('/role', roleRoutes)
route.use('/user', userRoutes)
route.use('/auth', authRoutes)
route.use('/ticket', ticketRoutes)

export default route
