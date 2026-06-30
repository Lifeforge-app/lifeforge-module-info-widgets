import { gstime, propagate } from 'satellite.js'
import z from 'zod'

import forge from '../forge'
import { eciToAltitude, eciToLatLng, eciToSpeed } from '../utils/eci'
import { getTLESatrec } from '../utils/satrec'
import { getSubsolarPoint, getTerminator } from '../utils/subsolarPoint'

const cache = new Map<string, unknown>()
const cacheTime = 1000 * 60

let lastFetch = 0

const PositionPointSchema = z.object({
  lat: z.number(),
  lng: z.number()
})

const ISSDataSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  altitude: z.number(),
  velocity: z.number(),
  timestamp: z.number()
})

const ResultSchema = z.object({
  status: ISSDataSchema,
  positions: z.array(PositionPointSchema),
  terminator: z.array(PositionPointSchema)
})

export const get = forge
  .query({
    description: 'Get ISS current status and orbit path from NASA TLE',
    noAuth: true,
    encrypted: false,
    output: {
      OK: ResultSchema
    }
  })
  .callback(async ({ response }) => {
    const now = +new Date()

    if (cache.has('iss') && now - lastFetch < cacheTime) {
      return response.ok(cache.get('iss') as z.infer<typeof ResultSchema>)
    }

    const satrec = await getTLESatrec(cache)
    const date = new Date(now)
    const positionAndVelocity = propagate(satrec, date)

    if (
      !positionAndVelocity ||
      !positionAndVelocity.position ||
      typeof positionAndVelocity.position === 'boolean' ||
      !positionAndVelocity.velocity ||
      typeof positionAndVelocity.velocity === 'boolean'
    ) {
      return response.ok({
        status: {
          latitude: 0,
          longitude: 0,
          altitude: 0,
          velocity: 0,
          timestamp: 0
        },
        positions: [],
        terminator: []
      })
    }

    const gmst = gstime(date)
    const { lat, lng } = eciToLatLng(positionAndVelocity.position, gmst)
    const altitude = eciToAltitude(positionAndVelocity.position, gmst)
    const velocity = eciToSpeed(positionAndVelocity.velocity) * 3600
    const timestamp = Math.floor(now / 1000)

    const status = {
      latitude: lat,
      longitude: lng,
      altitude,
      velocity,
      timestamp
    }

    const positionsPoints: Array<{ lat: number; lng: number }> = []

    for (let i = -50; i <= 50; i++) {
      const pointDate = new Date(now + i * 90000)
      const pv = propagate(satrec, pointDate)

      if (pv && pv.position && typeof pv.position !== 'boolean') {
        positionsPoints.push(eciToLatLng(pv.position, gstime(pointDate)))
      }
    }

    const subsolar = getSubsolarPoint(now)
    const terminator = getTerminator(subsolar.lat, subsolar.lng)

    const result = { status, positions: positionsPoints, terminator }

    cache.set('iss', result)
    lastFetch = now

    return response.ok(result)
  })
