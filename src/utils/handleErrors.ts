import {
	PrismaClientKnownRequestError,
	PrismaClientValidationError,
} from '@prisma/client/runtime/library'
import { Response } from 'express'

export const handleErrors = (error: any, res: Response) => {
	if (error instanceof PrismaClientKnownRequestError) {
		switch (error.code) {
			case 'P2002':
				// Unique constraint failed
				res.status(400).json({
					error: {
						message: 'El campo debe ser único',
						details: error.message,
					},
				})
				break
			case 'P2025':
				// Record not found
				res.status(404).json({
					error: {
						message: 'Dato no encontrado',
						details: error.message,
					},
				})
				break
			default:
				// Other Prisma errors
				res.status(500).json({
					error: {
						message: 'Ocurrió un error',
						details: error.message,
					},
				})
				break
		}
	} else if (error instanceof PrismaClientValidationError) {
		// Validation error
		res.status(400).json({
			error: {
				message: 'Error de validación de campos',
				details: error.message,
			},
		})
	} else {
		// Generic error
		res.status(500).json({
			error: {
				message: 'Ups, algo falló.',
				details: (error as Error).message,
			},
		})
	}
}
