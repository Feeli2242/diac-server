import { Request, Response } from 'express'
import { getUserService } from '../services/user.service'
import { compareSync } from 'bcrypt'
import { handleErrors } from '../utils/handleErrors'
import { generateToken } from '../utils/jwt'

export const loginUser = async (
	req: Request<{}, {}, { email: string; password: string }, {}>,
	res: Response
) => {
	try {
		const { email, password } = req.body
		const user = await getUserService(email)
		if (!user) throw new Error('Usuario no encontrado')
		const comparePass = compareSync(password, user.password)
		if (!comparePass) throw new Error('Contraseña incorrecta')
		const token = await generateToken(user.id)
		return res.append('auth', token).json(user)
	} catch (error) {
		return handleErrors(error, res)
	}
}

export const verifyTokenController = async (
	req: Request<{}, {}, { email: string; password: string }, {}>,
	res: Response
) => {
	try {
		return res.json({ success: true })
	} catch (error) {
		return handleErrors(error, res)
	}
}
