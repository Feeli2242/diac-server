import app from './app'

import { PORT } from './constants/envs'

app.listen(PORT, () => {
	console.log('Server running on port:', PORT)
})
