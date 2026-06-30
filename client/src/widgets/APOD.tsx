import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { useState } from 'react'

import { type WidgetConfig } from '@lifeforge/configs'
import {
  Box,
  LoadingScreen,
  Scrollbar,
  Stack,
  Text,
  Tooltip,
  Widget,
  WithQuery
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

dayjs.extend(localizedFormat)

function APOD() {
  const [imageLoaded, setImageLoaded] = useState(false)

  const apodQuery = useQuery(
    forgeAPI.apod.get.queryOptions({
      staleTime: 1000 * 60 * 30
    })
  )

  return (
    <Widget
      actionComponent={
        apodQuery.data && (
          <Tooltip
            icon="tabler:info-circle"
            id="apod-widget-tooltip"
            place="bottom-end"
            positionStrategy="absolute"
          >
            <Text as="p" leading="relaxed" style={{ maxWidth: '20rem' }}>
              {apodQuery.data.explanation}
            </Text>
          </Tooltip>
        )
      }
      icon="tabler:photo-star"
      title="apod"
    >
      <Scrollbar>
        <WithQuery query={apodQuery} showRetryButton={false}>
          {data => (
            <Stack height="100%">
              <Text as="h3" lineClamp={2} size="lg" title={data.title} weight="semibold">
                {data.title}
              </Text>
              <Text color="muted" mb="sm" size="sm">
                {dayjs(data.date).format('LL')}
              </Text>
              {data.media_type === 'image' && data.url ? (
                <Box
                  flex="1"
                  position="relative"
                  r="md"
                  style={{ overflow: 'hidden' }}
                  width="100%"
                >
                  {!imageLoaded && <LoadingScreen loaderSize="1rem" />}
                  <img
                    alt={data.title}
                    src={data.url}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: imageLoaded ? 'block' : 'none'
                    }}
                    onLoad={() => setImageLoaded(true)}
                  />
                </Box>
              ) : (
                <Box
                  overflow="hidden"
                  position="relative"
                  r="md"
                  style={{ paddingBottom: '56.25%' }}
                  width="100%"
                >
                  <Box
                    as="iframe"
                    height="100%"
                    left="0"
                    position="absolute"
                    src={data.url}
                    style={{ border: 'none' }}
                    title={data.title}
                    top="0"
                    width="100%"
                  />
                </Box>
              )}
            </Stack>
          )}
        </WithQuery>
      </Scrollbar>
    </Widget>
  )
}

export default APOD

export const config: WidgetConfig = {
  id: 'apod',
  icon: 'tabler:photo-star',
  minW: 2,
  minH: 2
}
