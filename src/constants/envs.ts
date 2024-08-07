import { config } from 'dotenv'
config()

export const PORT = process.env.PORT ?? 3001
export const SG_APIKEY = process.env.SENDGRID_APIKEY
export const SECRET = process.env.SECRETKEY ?? ''
