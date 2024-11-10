<script lang="ts">
  
import { onMount } from 'svelte'
import {
  FillLayer,
  GeoJSON,
  MapLibre,
  MarkerLayer,
  hoverStateFilter,
  NavigationControl,
  Popup
} from 'svelte-maplibre'

import type { Feature } from 'svelte-maplibre'

const fillColor = '#f2d6a8'
const fillColor2 = '#e1a035'
const center = { lon: 10.393661554752802, lat: 51.1065921857343 }

const icons = [
  "/icons/dinosaurier.svg",
  "/icons/diplodocus.svg",
  "/icons/spinosaurus.svg",
  "/icons/stegosaurus.svg",
  "/icons/styracosaurus.svg",
  "/icons/triceratops.svg"
]

let mapData = {}
let clickedCountry = {};

onMount(async () => {
  const response = await fetch('/map.json/')
  mapData = await response.json()
})

function getRandomIcon() {
    const randomIndex = Math.floor(Math.random() * icons.length);
    return icons[randomIndex];
}

function getMarkerPos(feature: Feature) {
  return JSON.parse(feature.properties.geo_point_2d)
}
</script>

<p class="font-bold transition text-lg text-center text-neutral-900 dark:text-neutral-100 relative mb-2">
  {#if clickedCountry?.name}
    In {clickedCountry?.name} gefunden:
    <ol class="flex flex-wrap items-center justify-center text-[var(--primary)]">
      {#each JSON.parse(clickedCountry.dinoFinds) as dinoFind}
      <li class="mx-1 my-1">
        <a href={`/dinos/${dinoFind.slug}`}>{dinoFind.name}</a>
      </li>
      {/each}
    </ol>
  {:else}
    <p>&nbsp;</p>
  {/if}
</p>
<MapLibre
  center={center}
  zoom={2}
  minZoom={1}
  class="map"
  style="https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json">
  <NavigationControl position="top-left" showCompass={false}/>
  <GeoJSON
    id="countries"
    data={mapData}
    promoteId="iso3">
    <FillLayer
      paint={{
        "fill-color": hoverStateFilter(fillColor, fillColor2),
        "fill-opacity": 0.4,
      }}
      on:click={(e) => (clickedCountry = e.detail.features[0]?.properties)}
      beforeLayerType="symbol"
      manageHoverState
    />
    <MarkerLayer
      asButton
      markerLngLat={getMarkerPos}
      on:click={(e) => (clickedCountry = e.detail.feature?.properties)}
      let:feature
      >
      <img src={getRandomIcon()} alt="Dino" width="32" height="32"> 
      <Popup openOn="hover" offset={[0, -10]}>
        {@const props = feature.properties}
        <p>
          <strong>{props?.name}</strong>
        </p>
        <p>
          Funde {props?.dinoFindCount}
        </p>
      </Popup>
    </MarkerLayer>
  </GeoJSON>
</MapLibre>

<style lang="css">
  :global(.map) {
    height: 600px;
  }
</style>
