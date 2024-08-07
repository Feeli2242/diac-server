import { Request, Response } from 'express'
import { handleErrors } from '../utils/handleErrors'
import { createRoleService, getRolesService } from '../services/role.service'

export const createRole = async (
	req: Request<{}, {}, { name: string }, {}>,
	res: Response
) => {
	const { name } = req.body
	try {
		if (!name) throw new Error('Debe enviar name por body')
		const newRole = await createRoleService(name)
		res.json(newRole)
	} catch (error) {
		return handleErrors(error, res)
	}
}

export const getAllRoles = async (req: Request, res: Response) => {
	try {
		const allRoles = await getRolesService()
		res.json(allRoles)
	} catch (error) {
		return handleErrors(error, res)
	}
}
