import { prisma } from '../config/prismaClient'
import { encript } from '../utils/encriptPass'
import { toCapitalize } from '../utils/stringParser'

export const createUserService = async ({
	email,
	password,
	name,
	roleId,
}: {
	email: string
	password: string
	name: string
	roleId: number
}) => {
	try {
		await prisma.user.create({
			data: {
				password: encript(password),
				email: email.toLowerCase(),
				name: toCapitalize(name),
				roleId,
			},
		})
	} catch (error) {
		throw error
	}
}

export const getUserService = async (email: string) => {
	try {
		const user = await prisma.user.findFirst({
			where: {
				email,
			},
			include: {
				role: true,
				assignedTickets: true,
				comments: true,
				tickets: true,
				attachments: true,
			},
		})
		return user
	} catch (error) {
		throw error
	}
}

export const getUsersService = async (roleName?: string) => {
	let role = roleName && {
		where: {
			role: { name: roleName },
		},
	}
	try {
		const user = await prisma.user.findMany({
			orderBy: {
				name: 'asc',
			},
			include: {
				role: true,
				assignedTickets: true,
				comments: true,
				tickets: true,
				attachments: true,
			},
			...role,
		})
		return user
	} catch (error) {
		throw error
	}
}

type UpdateFields = {
	id: number
	name?: string
	roleId?: number
}

export const updateUserService = async ({ id, ...rest }: UpdateFields) => {
	try {
		if (!id)
			throw new Error('Falta entregar id para reconocimiento de usuario')
		const user = await prisma.user.update({
			data: {
				name: rest.name ?? undefined,
				roleId: rest.roleId ?? undefined,
			},
			where: {
				id,
			},
			include: {
				role: true,
				assignedTickets: true,
				comments: true,
				tickets: true,
				attachments: true,
			},
		})
		return user
	} catch (error) {
		throw error
	}
}

export const deleteUserService = async (id: number) => {
	try {
		await prisma.user.delete({
			where: {
				id,
			},
		})
	} catch (error) {
		throw error
	}
}
