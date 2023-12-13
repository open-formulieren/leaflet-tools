import * as L from 'leaflet';
import 'proj4leaflet';

/**
 * Integration of Leaflet and Rijksdriehoek coordinate system.
 *
 * @note
 *
 * This code is heavily inspired on
 * https://github.com/arbakker/pdok-js-map-examples/blob/master/leaflet-geojson-wmts-epsg28992/index.js,
 * but there are many caveats expressed on
 * https://geoforum.nl/t/betrouwbare-bron-voor-proj4-definitie-van-rd-new-epsg-28992/5144/16.
 *
 * Most importantly, the accuracy of this projection is unclear - https://epsg.io/28992
 * lists accuracies of 1m for projections on EPSG:4326, while EPSG4258/ETRS89 has worst
 * accuracies of 0.5m. So it's reasonable to assume there are accuracies in this
 * projection between 0.01 - 1m.
 *
 * However, this exact Proj4 string does appear to be used in the Amsterdam data
 * map (https://data.amsterdam.nl/data/?modus=kaart) at the time of writing, so it may
 * just be good enough for non-critical applications.
 */

/**
 * Available resolution per zoom level. The zoom level is equal to the list index (and
 * thus starts at zero).
 *
 * The values are sourced from the "Nederlandse Richtlijn tiling, versie 1.1",
 * attachment B, found at
 * https://www.geonovum.nl/uploads/standards/downloads/nederlandse_richtlijn_tiling_-_versie_1.1.pdf
 *
 * Values are "Resolution (in pixels per meter) for each zoomlevel".
 */
const RESOLUTIONS = [
  3440.64, // zoom level 0
  1720.32,
  860.16,
  430.08,
  215.04,
  107.52,
  53.76,
  26.88,
  13.44,
  6.72,
  3.36,
  1.68,
  0.84,
  0.42, // zoom level 13
];

/**
 * The proj4 projection string to convert to/from RD.
 *
 * @see
 *
 * https://github.com/arbakker/pdok-js-map-examples/blob/master/leaflet-geojson-wmts-epsg28992/index.js
 */
const RD_PROJECTION = `+proj=sterea\
+lat_0=52.15616055555555\
+lon_0=5.38763888888889\
+k=0.9999079\
+x_0=155000\
+y_0=463000\
+ellps=bessel\
+units=m\
+towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.350732676542563,-1.8703473836068,4.0812\
+no_defs`;

/**
 * A leaflet CRS instance for the RD coordinate reference system.
 *
 * Pass this to the `crs` leaflet map option.
 */
export const CRS_RD = new L.Proj.CRS('EPSG:28992', RD_PROJECTION, {
  resolutions: RESOLUTIONS,
  origin: [-285401.92, 903401.92],
  transformation: new L.Transformation(-1, 0, -1, 0),
  // bounds taken from Nederlandse richtlijn tiling 1.1, chapter 4, section 4.1, item 5
  bounds: L.bounds(
    // top-left
    [-285401.92, 903401.92],
    // bottom-right
    [595401.92, 22598.08]
  ),
});
