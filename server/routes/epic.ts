import z from 'zod'

import forge from '../forge'

const cache = new Map<string, unknown>()
const cacheTime = 1000 * 60 * 30

let lastFetch = 0

const EPICImageSchema = z.object({
  identifier: z.string(),
  caption: z.string(),
  image: z.string(),
  date: z.string(),
  centroid_coordinates: z.object({
    lat: z.number(),
    lon: z.number()
  })
})

const EPICResultSchema = EPICImageSchema.extend({
  url: z.string()
})

export const get = forge
  .query({
    description: 'Get latest EPIC natural color Earth images',
    noAuth: true,
    encrypted: false,
    output: {
      OK: z.array(EPICResultSchema)
    }
  })
  .callback(async ({ response }) => {
    const now = +new Date()

    if (cache.has('epic') && now - lastFetch < cacheTime) {
      return response.ok(
        cache.get('epic') as Array<z.infer<typeof EPICResultSchema>>
      )
    }

    const res = await fetch('https://epic.gsfc.nasa.gov/api/natural')
    const images: Array<z.infer<typeof EPICImageSchema>> = await res.json()

    const result = images.map(img => {
      const [year, month, day] = img.date.split(' ')[0].split('-')

      return {
        ...img,
        url: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${img.image}.png`
      }
    })

    cache.set('epic', result)
    lastFetch = now

    return response.ok(result)
  })
