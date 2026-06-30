import { type EciVec3, eciToGeodetic } from 'satellite.js'

export function eciToLatLng(eci: EciVec3<number>, gmst: number) {
  const geodetic = eciToGeodetic(
    { x: eci.x, y: eci.y, z: eci.z } as Parameters<typeof eciToGeodetic>[0],
    gmst
  )

  return {
    lat: (geodetic.latitude * 180) / Math.PI,
    lng: (geodetic.longitude * 180) / Math.PI
  }
}

export function eciToAltitude(eci: EciVec3<number>, gmst: number) {
  const geodetic = eciToGeodetic(
    { x: eci.x, y: eci.y, z: eci.z } as Parameters<typeof eciToGeodetic>[0],
    gmst
  )

  return geodetic.height
}

export function eciToSpeed(velocity: EciVec3<number>) {
  return Math.sqrt(velocity.x ** 2 + velocity.y ** 2 + velocity.z ** 2)
}
