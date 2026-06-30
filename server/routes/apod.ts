import z from 'zod'

import forge from '../forge'

const cache = new Map<string, unknown>()
const cacheTime = 1000 * 60 * 30

let lastFetch = 0

const APODDataSchema = z.object({
  title: z.string(),
  date: z.string(),
  explanation: z.string(),
  hdurl: z.string(),
  url: z.string(),
  media_type: z.enum(['image', 'video'])
})

export const get = forge
  .query({
    description: 'Get NASA Astronomy Picture of the Day',
    noAuth: true,
    encrypted: false,
    output: {
      OK: APODDataSchema
    }
  })
  .callback(
    async ({
      pb,
      response,
      core: {
        api: { getAPIKey }
      }
    }) => {
      const now = +new Date()

      if (cache.has('apod') && now - lastFetch < cacheTime) {
        return response.ok(cache.get('apod') as z.infer<typeof APODDataSchema>)
      }

      const apiKey = await getAPIKey('nasa', pb).catch(() => null)

      if (!apiKey) {
        return response.ok({
          title: 'Missing NASA API Key',
          date: new Date().toISOString().split('T')[0],
          explanation: 'Add a NASA API key in the API Keys manager.',
          hdurl: '',
          url: '',
          media_type: 'image' as const
        })
      }

      const res = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      )
      const data = await res.json()

      cache.set('apod', data)
      lastFetch = now

      return response.ok(data)
    }
  )
