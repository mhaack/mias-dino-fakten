<script lang="ts">
import { onMount } from 'svelte'
import {
  CircleLayer,
  FillLayer,
  GeoJSON,
  MapLibre,
  MarkerLayer,
  hoverStateFilter,
} from 'svelte-maplibre'

const fillColor = '#006600'
const fillColor2 = '#330033'

let mapData = {}

onMount(async () => {
  const response = await fetch('/map.json/')
  mapData = await response.json()
})

// const createLinkedEntry = (name: string, url: string) => {
//   const entry = document.createElement('li')
//   const entryLink = document.createElement('a')
//   entryLink.href = url
//   entryLink.textContent = name
//   entry.append(entryLink)
//   return entry
// }

// const countrySelected = (geography: string, country: string) => {
//   const label = document.querySelector('div#picker span')
//   const wrapper = document.querySelector('div#picker ul')
//   if (country) {
//     label.textContent = `In ${geography.properties.name} gefunden:`

//     if (wrapper) {
//       wrapper.innerHTML = ''
//       country.info?.forEach(dino => {
//         wrapper.append(createLinkedEntry(dino.name, dino.url))
//       })
//     }
//   } else {
//     label.textContent = ''
//     wrapper.innerHTML = ''
//   }
// }

// const map = new Datamap({
//   element: document.getElementById('map'),
//   projection: 'mercator',
//   fills: {
//     defaultFill: '#a4a9dd',
//     dinoLocation: '#f8a900',
//   },
//   geographyConfig: {
//     highlightFillColor: '#ad5857',
//     highlightBorderWidth: 5,
//     popupTemplate: (geography, data) =>
//       data &&
//       data.info &&
//       "<div class='hoverinfo'><strong>" +
//         data.info.map(e => e.name).join('<br>') +
//         '</strong></div>',
//   },
//   dataUrl: '/map.json',
//   done: datamap => {
//     datamap.svg.selectAll('.datamaps-subunit').on('click', geography => {
//       const country = map.options.data[geography.id]
//       countrySelected(geography, country)
//     })
//   },
// })

//$: filter = countries ? ['==', true, ['get', 'dinoFind']] : undefined
</script>

<MapLibre
  center={[50, 20]}
  zoom={1}
  class="map"
  standardControls
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
>
  <GeoJSON
    id="countries"
    data={mapData}
    promoteId="iso3"
  >
    <FillLayer
      paint={{
        "fill-color": hoverStateFilter(fillColor, fillColor2),
        "fill-opacity": 0.4,
      }}
      
      beforeLayerType="symbol"
      manageHoverState
    />


   

    <!-- <MarkerLayer  let:feature {filter}>
        <div class="rounded-full bg-gray-200 p-2 shadow">
          <div class="text-sm font-bold">{feature.properties.dinoFindCount}</div>
        </div>
    
      </MarkerLayer> -->
  </GeoJSON>
</MapLibre>

<style lang="css">
  :global(.map) {
    height: 600px;
  }
</style>
