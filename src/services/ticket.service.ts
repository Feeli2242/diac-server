import { prisma } from '../config/prismaClient'
import { pagination } from '../utils/pagination'
interface TicketCreation {
	title: string
	description: string
	status: string
	creatorId: number
}

enum Status {
	PENDIENTE = 'pendiente',
	PROCESO = 'en_proceso',
	CERRADO = 'cerrado',
}

const validateStatus = (status: string) => {
	const esPendiente = status === Status.PENDIENTE
	const esProceso = status === Status.PROCESO
	const esCerrado = status === Status.CERRADO
	return esPendiente || esProceso || esCerrado
}

export const createTicketService = async ({
	title,
	creatorId,
	description,
	status,
}: TicketCreation) => {
	try {
		const esStatusValido = validateStatus(status)
		if (!esStatusValido)
			throw new Error(
				'El estado del ticket debe ser: pendiente | en_proceso | cerrado '
			)
		const newTicket = await prisma.ticket.create({
			data: {
				title,
				description,
				status,
				creatorId,
			},
		})
		return newTicket
	} catch (error) {
		throw error
	}
}

export const getTicketsService = async ({
	status,
	creatorId,
	page = 1,
	pageSize = 2,
}: {
	status?: string
	creatorId?: number
	page?: number
	pageSize?: number
}) => {
	try {
		const where = {
			status,
			creatorId,
		}

		const tickets = await pagination(prisma.ticket, page, pageSize, where)
		return tickets
	} catch (error) {
		throw error
	}
}
