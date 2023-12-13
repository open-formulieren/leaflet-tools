# Leaflet tools

Leaflet tools sets up some commonly shared/copy-pasted snippets for working with Dutch (goverment)
geo standards, such as the "Rijksdriehoek" (RD) coordinate system.

[![Run CI build and tests](https://github.com/open-formulieren/leaflet-tools/actions/workflows/ci.yml/badge.svg)](https://github.com/open-formulieren/leaflet-tools/actions/workflows/ci.yml)

## Usage

The library ships constants/utilities that can be used both in imperative, vanilla JS or with UI
libraries like React.

### In vanilla JS

```js
import * as L from 'leaflet';
import {CRS_RD, TILE_LAYER_RD} from '@open-formulieren/leaflet-tools';

const map = L.map('my-map', {
  continuousWorld: true,
  crs: CRS_RD, // use Rijksdriehoek coordinate system
  attributionControl: true,
  center: [52.1326332, 5.291266], // must be provided as EPSG:4326 coordinates, is transformed via `crs` option
  zoom: 3, // value between 0-13
});
const {url, ...options} = TILE_LAYER_RD;
const tiles = L.tileLayer(url, options);
map.addLayer(tiles);
```

### With React

```jsx
import {MapContainer, TileLayer} from 'react-leaflet';
import {CRS_RD, TILE_LAYER_RD} from '@open-formulieren/leaflet-tools';

const MyMap = () => (
  <MapContainer
    continuousWorld
    crs={CRS_RD}
    attributionControl
    center={[52.1326332, 5.291266]}
    zoom={3}
  >
    <TileLayer {...TILE_LAYER_RD} />
  </MapContainer>
);
```

## Background

While the code itself is not particularly exciting, there are _a lot_ of magic numbers and
configuration that require some context to properly judge them and recording that context is
arguably the biggest benefit of a standalone library/repository.

... TODO -> continue

**References**

- https://github.com/arbakker/pdok-js-map-examples/blob/master/leaflet-geojson-wmts-epsg28992/index.js
- https://nlmaps.nl/ &
  https://github.com/PDOK/nlmaps/blob/cf2ba6b825853e8bfc34ed3c7b7ff779dda722e9/packages/nlmaps/test/browser-test.js#L36
- https://github.com/geoloep/Leaflet.RD/blob/master/src/leaflet.rd.js
- https://app.pdok.nl/viewer/
- https://data.amsterdam.nl/data/?modus=kaart
- https://epsg.io/28992-9281
- https://geoforum.nl/t/betrouwbare-bron-voor-proj4-definitie-van-rd-new-epsg-28992/5144/16
- https://www.geonovum.nl/uploads/standards/downloads/nederlandse_richtlijn_tiling_-_versie_1.1.pdf
