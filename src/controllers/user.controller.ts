import { Request, Response } from 'express'
import {
	createUserService,
	deleteUserService,
	getUserService,
	getUsersService,
	updateUserService,
} from '../services/user.service'
import { handleErrors } from '../utils/handleErrors'
import mail from '../config/sendGrid'
import { generateToken } from '../utils/jwt'

type BodyCreateUser = {
	email: string
	password: string
	name: string
	roleId: number
}

export const createUser = async (
	req: Request<{}, {}, BodyCreateUser, {}>,
	res: Response
) => {
	try {
		const { email, name, password, roleId } = req.body
		if (!email || !name || !password || !roleId)
			throw new Error('Hay campos sin completar')
		const newUser = await createUserService({
			email,
			name,
			password,
			roleId,
		})

		mail.send({
			from: 'comunicaciones@fiscaliadelconsumidor.cl',
			to: 'felipe.calderon321@gmail.com',
			subject: `Atención, ${name} se ha registrado en DIAC`,
			html: `<div>
                <strong>Te informo que hay un nuevo usuario registrado en el DIAC</strong>
                <p>Sus datos son:</p>
                <p>Usuario: ${email} (${name})</p>
                <p>¡Atento por si escribe un mensaje por la plataforma!</p>
                <br></br>
                <p><strong><i>No responda a este correo, no lo recibiremos en nuestras casillas, toda comunicación debe ser por medio de la plataforma DIAC.</i></strong></p>
            </div>`,
		})

		mail.send({
			from: 'comunicaciones@fiscaliadelconsumidor.cl',
			to: email,
			subject: `Gracias por registrarte al DIAC ${name}`,
			html: `<div>
                <strong>Te damos la bienvenida al Departamento de Información y Atención al Consumidor (DIAC 2.0)</strong>
                <p>Tus datos de ingreso a la plataforma son:</p>
                <p>Usuario: ${email}</p>
                <p>Contraseña: ${password}</p>
                <br></br>
                <p>¡Puedes ingresar y crear tu primer ticket de ayuda!</p>
                <br></br>
                <p><strong><i>No responda a este correo, no lo recibiremos en nuestras casillas, toda comunicación debe ser por medio de la plataforma DIAC.</i></strong></p>
            </div>`,
		})

		res.json(newUser)
	} catch (error) {
		return handleErrors(error, res)
	}
}

export const getUsers = async (
	req: Request<
		{},
		{},
		{},
		{ email?: string; role?: string; page?: number; pageSize?: number }
	>,
	res: Response
) => {
	try {
		const { email, role, page, pageSize } = req.query
		if (email) {
			const user = await getUserService(email)
			return res.json(user)
		}
		const users = await getUsersService(role, page, pageSize)
		res.json(users)
	} catch (error) {
		return handleErrors(error, res)
	}
}

export const updateUser = async (
	req: Request<{}, {}, { id: number; name?: string; roleId?: number }, {}>,
	res: Response
) => {
	try {
		const user = await updateUserService(req.body)
		res.json(user)
	} catch (error) {
		return handleErrors(error, res)
	}
}

export const deleteUser = async (
	req: Request<{ id: string }, {}, {}, {}>,
	res: Response
) => {
	try {
		const { id } = req.params
		await deleteUserService(Number(id))
		res.json({ success: true })
	} catch (error) {
		return handleErrors(error, res)
	}
}
