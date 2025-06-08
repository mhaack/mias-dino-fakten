import type { APIRoute } from 'astro'

import countries from '../components/map/countries.json'
import { getDinoCountryList } from '../utils/content-utils'

const dinoCountryList = await getDinoCountryList()

const mapData = {
  type: 'FeatureCollection',
  features: [] as any[],
}

for (const country of countries.features) {
  const isoCode = country.properties.iso3
  const finds = dinoCountryList.get(isoCode || '')
  if (finds && isoCode) {
    const extendedCountry = {
      ...country,
      properties: {
        ...country.properties,
        dinoFind: true,
        dinoFinds: finds.dinos,
        dinoFindCount: finds.dinos.length,
      },
    }
    mapData.features.push(extendedCountry)
  }
}

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(mapData))
}
