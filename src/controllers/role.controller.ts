import { Request, Response } from 'express'
import { handleErrors } from '../utils/handleErrors'
import { createRoleService } from '../services/role.service'

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
