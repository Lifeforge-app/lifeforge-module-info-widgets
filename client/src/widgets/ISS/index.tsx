import { useQuery } from '@tanstack/react-query'

import { type WidgetConfig } from '@lifeforge/configs'
import { useModuleTranslation } from '@lifeforge/localization'
import { Scrollbar, Stack, Widget, WithQuery } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import ISSMap from './components/ISSMap'
import ISSTooltipContent from './components/ISSTooltipContent'
import WidgetInfoRow from './components/WidgetInfoRow'

function ISS() {
  const { t } = useModuleTranslation()

  const issQuery = useQuery(
    forgeAPI.iss.get.queryOptions({
      refetchInterval: 60000
    })
  )

  return (
    <Widget
      actionComponent={
        issQuery.data ? <ISSTooltipContent data={issQuery.data} /> : undefined
      }
      icon="tabler:rocket"
      title="iss"
    >
      <Scrollbar>
        <WithQuery query={issQuery} showRetryButton={false}>
          {data => (
            <Stack height="100%">
              <ISSMap data={data} />
              <Stack flex="1">
                <WidgetInfoRow
                  icon="tabler:arrow-up"
                  label={t('widgets.iss.labels.altitude')}
                  value={`${data.status.altitude.toFixed(0)} ${t('widgets.iss.units.km')}`}
                />
                <WidgetInfoRow
                  icon="tabler:speedboat"
                  label={t('widgets.iss.labels.velocity')}
                  value={`${data.status.velocity.toFixed(0)} ${t('widgets.iss.units.kmh')}`}
                />
              </Stack>
            </Stack>
          )}
        </WithQuery>
      </Scrollbar>
    </Widget>
  )
}

export default ISS

export const config: WidgetConfig = {
  id: 'iss',
  icon: 'tabler:rocket',
  minW: 2,
  minH: 3
}
