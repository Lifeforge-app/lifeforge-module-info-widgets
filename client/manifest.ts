import { createForgeModuleClient } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModuleClient({
  routes: {},
  hidden: true,
  contract,
  widgets: [
    () => import('@/widgets/Overview'),
    () => import('@/widgets/ISS')
  ]
})

export default manifest

export { forgeAPI }
