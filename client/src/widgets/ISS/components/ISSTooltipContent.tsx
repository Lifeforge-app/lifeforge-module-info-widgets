import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

import { type InferOutput } from '@lifeforge/api'
import { useModuleTranslation } from '@lifeforge/localization'
import { Box, Stack, Text, Tooltip } from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

dayjs.extend(localizedFormat)
dayjs.extend(relativeTime)

function ISSTooltipContent({
  data
}: {
  data: InferOutput<typeof forgeAPI.iss.get>
}) {
  const { t } = useModuleTranslation()

  return (
    <Box mr="md">
      <Tooltip
        icon="tabler:info-circle"
        id="iss-widget-tooltip"
        place="bottom-end"
        positionStrategy="absolute"
      >
        <Stack gap="md">
          <Box>
            <Text as="h3" weight="medium">
              {t('widgets.iss.tooltip.rawPosition')}
            </Text>
            <Text
              as="p"
              color={{ base: 'bg-800', dark: 'bg-100' }}
              size="lg"
            >
              {data.status.latitude.toFixed(4)},{' '}
              {data.status.longitude.toFixed(4)}
            </Text>
          </Box>
          <Box>
            <Text as="h3" weight="medium">
              {t('widgets.iss.tooltip.lastFetched')}
            </Text>
            <Text
              as="p"
              color={{ base: 'bg-800', dark: 'bg-100' }}
              size="lg"
            >
              {dayjs(data.status.timestamp * 1000).format('LLL')}
            </Text>
          </Box>
        </Stack>
      </Tooltip>
    </Box>
  )
}

export default ISSTooltipContent
