import { forgeRouter, writeContractFileToClient } from '@lifeforge/server-utils'

import * as issRouter from './routes/iss'

const routes = forgeRouter({
  iss: issRouter
})

writeContractFileToClient(routes, import.meta.dirname)

export default routes
