import express from 'express'
import routes from './routes'
import cors from 'cors'
const app = express()

app.use(
	cors({
		origin: '*',
	})
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)

export default app
