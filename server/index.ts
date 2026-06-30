import { forgeRouter, writeContractFileToClient } from '@lifeforge/server-utils'

import * as apodRouter from './routes/apod'
import * as epicRouter from './routes/epic'
import * as issRouter from './routes/iss'

const routes = forgeRouter({
  apod: apodRouter,
  epic: epicRouter,
  iss: issRouter
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
