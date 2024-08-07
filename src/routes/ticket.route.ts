import { Router } from 'express'
import {
	deleteTicket,
	getTickets,
	newTicket,
	updateTicket,
} from '../controllers/ticket.controller'

const route = Router()

route.get('/', getTickets)
route.post('/', newTicket)
route.put('/', updateTicket)
route.delete('/:id', deleteTicket)

export default route
