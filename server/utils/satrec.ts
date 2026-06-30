import { twoline2satrec } from 'satellite.js'

const TLECacheTime = 1000 * 60 * 60 * 6

let lastTLEDate = 0

export async function getTLESatrec(cache: Map<string, unknown>) {
  const cached = cache.get('tle') as
    | ReturnType<typeof twoline2satrec>
    | undefined

  if (cached && +new Date() - lastTLEDate < TLECacheTime) {
    return cached
  }

  const res = await fetch(
    'https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=TLE',
    { signal: AbortSignal.timeout(30000) }
  )
  const text = await res.text()
  const lines = text.trim().split('\n')

  const satrec = twoline2satrec(lines[1].trim(), lines[2].trim())

  cache.set('tle', satrec)
  lastTLEDate = +new Date()

  return satrec
}
