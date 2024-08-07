import { Request, Response } from 'express'
import { handleErrors } from '../utils/handleErrors'
import {
	createTicketService,
	getTicketsService,
} from '../services/ticket.service'

export const newTicket = async (
	req: Request<
		{},
		{},
		{
			title: string
			description: string
			status: string
			creatorId: number
		},
		{}
	>,
	res: Response
) => {
	try {
		const ticket = await createTicketService(req.body)
		res.json(ticket)
	} catch (error) {
		return handleErrors(error, res)
	}
}

export const getTickets = async (req: Request, res: Response) => {
	try {
		const tickets = await getTicketsService(req.query)
		res.json(tickets)
	} catch (error) {
		return handleErrors(error, res)
	}
}
