import { useQuery } from '@tanstack/react-query'
import { APIProvider, AdvancedMarker, Map } from '@vis.gl/react-google-maps'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

import {
  Box,
  Button,
  ModalHeader,
  Stack,
  Text,
  WithQuery,
  colorWithOpacity
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

import type { EPICImage } from '../index'

interface SelectCoordinateModalData {
  images: EPICImage[]
  selectedId: string
  onSelect: (image: EPICImage) => void
}

export default function SelectCoordinateModal({
  onClose,
  data: { images, selectedId, onSelect }
}: {
  onClose: () => void
  data: SelectCoordinateModalData
}) {
  const { t } = useTranslation('apps.lifeforge--astronomy-widgets')
  const [previewId, setPreviewId] = useState(selectedId)

  const googleMapAPIKeyQuery = useQuery(
    forgeAPI.getAPIKeys({ keyId: 'gcloud' }).queryOptions({ retry: false })
  )

  const selected = useMemo(
    () => images.find(img => img.identifier === previewId) ?? images[0],
    [images, previewId]
  )

  const defaultCenter = useMemo(() => {
    if (!selected) return { lat: 0, lng: 0 }

    return {
      lat: selected.centroid_coordinates.lat,
      lng: selected.centroid_coordinates.lon
    }
  }, [selected])

  return (
    <Stack gap="md" height="100%" minWidth="40vw">
      <ModalHeader
        icon="tabler:globe"
        namespace="apps.lifeforge--astronomy-widgets"
        title='widgets.epic.selectCoordinate'
        onClose={onClose}
      />
      <WithQuery query={googleMapAPIKeyQuery} showRetryButton={false}>
        {googleMapAPIKey =>
          googleMapAPIKey ? (
            <>
              <Box flex="1" height="100%" overflow="hidden" r="md" width="100%">
                <APIProvider apiKey={googleMapAPIKey}>
                  <Map
                    colorScheme="DARK"
                    defaultCenter={defaultCenter}
                    defaultZoom={1}
                    mapId="EPICCoordinateSelector"
                    style={{
                      width: '100%',
                      height: '40vh',
                      flex: '1'
                    }}
                  >
                    {images.map(img => (
                      <AdvancedMarker
                        key={img.identifier}
                        position={{
                          lat: img.centroid_coordinates.lat,
                          lng: img.centroid_coordinates.lon
                        }}
                        onClick={() => setPreviewId(img.identifier)}
                      >
                        <Box
                          bg={
                            img.identifier === previewId
                              ? 'primary'
                              : colorWithOpacity('bg-500', '50%')
                          }
                          r="full"
                          style={{
                            width: '12px',
                            height: '12px',
                            border:
                              img.identifier === previewId
                                ? '2px solid white'
                                : '1px solid white',
                            cursor: 'pointer'
                          }}
                        />
                      </AdvancedMarker>
                    ))}
                  </Map>
                </APIProvider>
              </Box>
              <Text align="center" color="muted">
                {selected.centroid_coordinates.lat.toFixed(2)}°
                {selected.centroid_coordinates.lat >= 0 ? 'N' : 'S'},{' '}
                {selected.centroid_coordinates.lon.toFixed(2)}°
                {selected.centroid_coordinates.lon >= 0 ? 'E' : 'W'}
              </Text>
              <Button
                icon="tabler:check"
                namespace="apps.lifeforge--astronomy-widgets"
                variant="primary"
                width="100%"
                onClick={() => {
                  onSelect(selected)
                  onClose()
                }}
              >
                widgets.epic.selectThisView
              </Button>
            </>
          ) : (
            <Text align="center" color="muted">
              {t('widgets.epic.mapKeyRequired')}
            </Text>
          )
        }
      </WithQuery>
    </Stack>
  )
}
