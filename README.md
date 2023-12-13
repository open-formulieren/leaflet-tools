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

The
[Geoformum](https://geoforum.nl/t/betrouwbare-bron-voor-proj4-definitie-van-rd-new-epsg-28992/5144)
thread is quite informative, as it points to the PROJ4 projection that is defined in this library,
which itself is taken from an examples repository by @arbakker. It points out a number of issues:

- the projection has accuracy issues (typically in the order of centimeters)
- the correct approach is taking a correction grid into consideration, but this requires additional
  files that are not easily discovered/obtained, let alone used in a Javascript context
- PROJ4 is apparently quite outdated, PROJ6 and even PROJ7 are a thing by "now" (the thread is from
  2020, so this may also be outdated again)
- A coordinate reference system like EPSG:28992 with just that number doesn't specify much, it
  basically only guarantees that the coordinates are to be interpreted as distances in meters
  (unit), but projections themselves _also_ have a number, e.g. EPSG 28992, transformation 9282
  properly identifies a certain projection with a particular PROJ4 string, and from there on you can
  make claims about accuracy.
- There are probably better (more accurate) transformations, but the maintainers don't fully
  understand how this relates to bounds, origin and resolutions.

In search of a definitive source on what and how things should be done, we also came across other
implementations which use different PROJ4 transformation strings. The particular transformation
string in this codebase was not found on epsg.io, but that doesn't really mean anything, as this is
not an official/authorative source (!). epsg.org is the actual authorative database, and the Dutch
geo organizations submit official dataset there.

Geonovum/kadaster also supports nlmaps.nl, which doesn't appear to apply the RD CRS but instead uses
either the global or European coordinate systems. Some transformation strings were found in
commented out code.

The data.amsterdam.nl map view was inspected, which yielded the same transformation string as used
in this codebase. It is plausible they _also_ took it from @arbakker's example repository.

With regard to a bunch of magic numbers, the document "Nederlandse richtlijn tiling versie 1.1" was
quite informative and provided context, such as describing the resolution (in pixels per meter) for
each zoom level, where the zoom levels map 1-to-1 to the zoom levels used in Leaflet (leaflet
supports 0-20, but the document provides in zoom levels 1-13).

From this short summary, you can conclude that this is an extremely big and complicated topic and
the disclaimer then also follows that if (high) accuracy is crucial, you definitely should not be
using this library.

**References**

- https://github.com/arbakker/pdok-js-map-examples/blob/master/leaflet-geojson-wmts-epsg28992/index.js
- https://nlmaps.nl/
  https://github.com/PDOK/nlmaps/blob/cf2ba6b825853e8bfc34ed3c7b7ff779dda722e9/packages/nlmaps/test/browser-test.js#L36
- https://github.com/geoloep/Leaflet.RD/blob/master/src/leaflet.rd.js
- https://app.pdok.nl/viewer/
- https://data.amsterdam.nl/data/?modus=kaart
- https://epsg.io/28992-9281
- https://geoforum.nl/t/betrouwbare-bron-voor-proj4-definitie-van-rd-new-epsg-28992/5144/16
- https://www.geonovum.nl/uploads/standards/downloads/nederlandse_richtlijn_tiling_-_versie_1.1.pdf
