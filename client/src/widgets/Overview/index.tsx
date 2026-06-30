import { type WidgetConfig } from '@lifeforge/configs'
import { useModuleTranslation } from '@lifeforge/localization'
import { Scrollbar, Stack, Widget } from '@lifeforge/ui'

import InfoRow from './components/InfoRow'
import { BROWSER_MAP, OS_MAP, resolve } from './constants'

function Overview() {
  const { t } = useModuleTranslation()

  const ua = navigator.userAgent
  const { width, height } = window.screen
  const language = navigator.language

  const browser = resolve(ua, BROWSER_MAP)
  const os = resolve(ua, OS_MAP)

  const rows = [
    {
      icon: browser?.icon ?? 'tabler:world-www',
      labelKey: 'browser',
      value: browser?.name ?? 'Unknown'
    },
    {
      icon: 'tabler:device-desktop',
      labelKey: 'os',
      value: os?.label ?? 'Unknown'
    },
    {
      icon: 'tabler:dimensions',
      labelKey: 'screen',
      value: `${width} × ${height}`
    },
    {
      icon: 'tabler:language',
      labelKey: 'language',
      value: language
    }
  ]

  return (
    <Widget icon="tabler:info-circle" title="overview">
      <Scrollbar>
        <Stack>
          {rows.map(row => (
            <InfoRow
              key={row.labelKey}
              icon={row.icon}
              label={t(`widgets.overview.labels.${row.labelKey}`)}
              value={row.value}
            />
          ))}
        </Stack>
      </Scrollbar>
    </Widget>
  )
}

export default Overview

export const config: WidgetConfig = {
  id: 'overview',
  icon: 'tabler:info-circle',
  minW: 2,
  minH: 2
}
