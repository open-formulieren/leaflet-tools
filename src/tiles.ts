import {TILE_BASE_URL, TILES_ATTRIBUTION} from './constants';

type BackgroundLayerVariant = 'standaard' | 'grijs' | 'pastel' | 'water';
type Projection = 'EPSG:28992' | 'EPSG:25831' | 'EPSG:3857';

export const buildTileLayerEndpoint = (
  variant: BackgroundLayerVariant = 'standaard',
  projection: Projection = 'EPSG:28992'
): string => {
  const base = `${TILE_BASE_URL}${variant}/${projection}`;
  return `${base}/{z}/{x}/{y}.png`;
};

/**
 * A pre-configured tile layer for the Rijksdriehoek (RD) projection (EPSG:28992).
 *
 * This uses the standard tile layer with attribution enabled, while limiting the zoom
 * level between 1 and 13.
 *
 * @note
 *
 * Increasing the zoom level is *possible*, but the inaccuracies of the proj4
 * transformation start to show beyond zoom level 13.
 */
export const TILE_LAYER_RD = {
  url: buildTileLayerEndpoint('standaard', 'EPSG:28992'),
  minZoom: 1,
  maxZoom: 13,
  attribution: TILES_ATTRIBUTION,
};
