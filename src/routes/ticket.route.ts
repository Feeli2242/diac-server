import { Router } from 'express'
import { getTickets, newTicket } from '../controllers/ticket.controller'

const route = Router()

route.get('/', getTickets)
route.post('/', newTicket)

export default route
