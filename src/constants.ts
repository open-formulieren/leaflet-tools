/**
 * Base URL to Kadaster service serving the tile layer assets.
 *
 * @see https://www.pdok.nl/introductie/-/article/basisregistratie-topografie-achtergrondkaarten-brt-a-
 */
export const TILE_BASE_URL = 'https://service.pdok.nl/brt/achtergrondkaart/wmts/v2_0/' as const;

/**
 * Attribution for the tiles layer, typically displayed on the map itself.
 *
 * https://www.pdok.nl/introductie/-/article/basisregistratie-topografie-achtergrondkaarten-brt-a-
 * does not seem to mention any requirements for attribution, so it's unclear if there
 * is a legal requirement to show it or not.
 *
 * @todo internationalization *could* be nice.
 */
export const TILES_ATTRIBUTION = `
    Kaartgegevens &copy;
    <a href="https://www.kadaster.nl">Kadaster</a> |
    <a href="https://www.verbeterdekaart.nl">Verbeter de kaart</a>
` as const;
