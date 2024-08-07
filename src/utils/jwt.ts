import { SignJWT, decodeJwt } from 'jose'
import { SECRET } from '../constants/envs'

const secret = new TextEncoder().encode(SECRET)

interface TokenPayload {
	id: number
	exp: number
}

export const generateToken = async (id: number) => {
	try {
		const encode = await new SignJWT({ id })
			.setProtectedHeader({ alg: 'HS256' })
			.setIssuedAt()
			.setExpirationTime('1h')
			.sign(secret)
		return encode
	} catch (error) {
		console.error(error, 'generateToken JWT.ts')
		return ''
	}
}

export const validateToken = async (token: string) => {
	try {
		const validate = await decodeToken(token)
		if (!validate) throw new Error('Token inválido')
		const fecha = Math.floor(Date.now() / 1000)
		const isActive = validate.exp > fecha
		if (!isActive) throw new Error('Token caducado')
		return await generateToken(validate.id)
	} catch (error) {
		console.error(error, 'validateToken JWT.ts')
		throw error
	}
}

export const decodeToken = async (token: string) => {
	try {
		const decoded: TokenPayload = decodeJwt(token)
		if (!decoded.exp || !decoded.id) throw new Error('Token invalido')
		return decoded
	} catch (error) {
		console.error(error, 'decodeToken JWT.ts')
		return null
	}
}
