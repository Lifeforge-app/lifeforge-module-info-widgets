import { createForgeModuleClient } from '@lifeforge/federation'

import contract from './contract'

const { forgeAPI, ...manifest } = createForgeModuleClient({
  routes: {},
  hidden: true,
  contract,
  widgets: [
    () => import('@/widgets/ISS'),
    () => import('@/widgets/APOD'),
    () => import('@/widgets/EPIC')
  ]
})

export default manifest

export { forgeAPI }
