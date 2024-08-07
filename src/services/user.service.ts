import { prisma } from '../config/prismaClient'
import { encript } from '../utils/encriptPass'
import { pagination } from '../utils/pagination'
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
		const newUser = await prisma.user.create({
			data: {
				password: encript(password),
				email: email.toLowerCase(),
				name: toCapitalize(name),
				roleId,
			},
		})
		return newUser
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

export const getUsersService = async (
	roleName?: string,
	page = 1,
	pageSize = 10
) => {
	try {
		const where = {
			role: { name: roleName },
		}
		const users = pagination(prisma.user, page, pageSize, where)
		return users
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
		return true
	} catch (error) {
		throw error
	}
}
