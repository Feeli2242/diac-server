import { prisma } from '../config/prismaClient'

export const createRoleService = async (name: string) => {
	try {
		const validRoles = ['Usuario', 'Administrador', 'Agente']
		if (!validRoles.includes(name)) {
			throw new Error('El rol no es válido')
		}
		const newRole = await prisma.role.create({
			data: { name },
		})
		return newRole
	} catch (error) {
		throw error
	}
}

export const getRoleService = async (name: string) => {
	try {
		const findRole = await prisma.role.findFirst({
			where: {
				name,
			},
		})
		return findRole
	} catch (error) {
		throw error
	}
}

export const getRolesService = async () => {
	try {
		const findRoles = await prisma.role.findMany()
		return findRoles
	} catch (error) {
		throw error
	}
}
