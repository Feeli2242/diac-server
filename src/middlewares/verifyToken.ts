import { NextFunction, Request, Response } from 'express'
import { handleErrors } from '../utils/handleErrors'
import { validateToken } from '../utils/jwt'

export const verifyToken = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { auth } = req.headers
		if (!auth) throw new Error('Ruta protegida')
		const oldToken = auth as string
		const newToken = await validateToken(oldToken)
		res.setHeader('auth', newToken)
		next()
	} catch (error) {
		handleErrors(error, res)
	}
}
