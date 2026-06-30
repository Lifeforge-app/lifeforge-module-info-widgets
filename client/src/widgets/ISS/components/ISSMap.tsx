import { useQuery } from '@tanstack/react-query'
import {
  APIProvider,
  AdvancedMarker,
  Map,
  Polygon,
  Polyline
} from '@vis.gl/react-google-maps'

import { type InferOutput } from '@lifeforge/api'
import {
  Box,
  EmptyStateScreen,
  WithQuery,
  usePersonalization
} from '@lifeforge/ui'

import { forgeAPI } from '@/manifest'

function ISSMap({
  data
}: {
  data: InferOutput<typeof forgeAPI.iss.get>
}) {
  const { derivedTheme } = usePersonalization()

  const googleMapAPIKeyQuery = useQuery(
    forgeAPI.getAPIKeys({ keyId: 'gcloud' }).queryOptions({ retry: false })
  )

  return (
    <WithQuery query={googleMapAPIKeyQuery} showRetryButton={false}>
      {googleMapAPIKey =>
        googleMapAPIKey ? (
          <Box overflow="hidden" r="md">
            <APIProvider apiKey={googleMapAPIKey}>
              <Box height="12rem" r="md" width="100%">
                <Map
                  colorScheme={derivedTheme === 'dark' ? 'DARK' : 'LIGHT'}
                  defaultCenter={{ lat: data.status.latitude, lng: data.status.longitude }}
                  defaultZoom={1}
                  mapId="ISSTracker"
                  mapTypeId="satellite"
                >
                  <AdvancedMarker
                    position={{
                      lat: data.status.latitude,
                      lng: data.status.longitude
                    }}
                  >
                    <img
                      alt="ISS"
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f2/ISS_spacecraft_model_1.png"
                      style={{ width: '3rem', height: '3rem' }}
                    />
                  </AdvancedMarker>

                  {data.terminator.length > 0 && (
                    <Polygon
                      options={{
                        fillColor: '#000000',
                        fillOpacity: 0.5,
                        strokeColor: '#FFD700',
                        strokeOpacity: 0.6,
                        strokeWeight: 1
                      }}
                      paths={[data.terminator]}
                    />
                  )}
                  {data.positions.length > 0 && (
                    <Polyline
                      options={{
                        geodesic: true,
                        strokeColor: '#FF5722',
                        strokeOpacity: 0.6,
                        strokeWeight: 2
                      }}
                      path={data.positions}
                    />
                  )}
                </Map>
              </Box>
            </APIProvider>
          </Box>
        ) : (
          <EmptyStateScreen
            smaller
            icon="tabler:map-off"
            message={{ id: 'mapKey', tKey: 'widgets.iss' }}
          />
        )
      }
    </WithQuery>
  )
}

export default ISSMap
