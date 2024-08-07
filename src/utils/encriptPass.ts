import { hashSync } from 'bcrypt'
export const encript = (value: string) => {
	return hashSync(value, 6)
}
