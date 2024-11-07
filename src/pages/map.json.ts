import type { APIRoute } from 'astro'

import countries from '../components/map/countries.json'
import { getDinoCountryList } from '../utils/content-utils'

const dinoCountryList = await getDinoCountryList()

const mapData = {
  type: 'FeatureCollection',
  features: [],
}

for (const country of countries.features) {
  const isoCode = country.properties.iso3
  const finds = dinoCountryList.get(isoCode)
  if (finds) {
    country.properties.dinoFind = true
    country.properties.dinoFinds = finds
    country.properties.dinoFindCount = finds.dinos.length
    mapData.features.push(country)
  }
}

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(mapData))
}
