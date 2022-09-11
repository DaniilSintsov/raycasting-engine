// Map
const _ = false
export const TEXT_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, _, _, _, _, _, 2, _, _, _, _, _, _, _, _, _, _, 4, _, _, _, _, _, 1],
  [1, _, 2, 2, _, _, _, _, _, 2, 2, 2, _, _, _, 3, _, _, _, _, 4, _, _, 1],
  [1, _, _, _, _, _, _, _, _, _, _, 2, 2, _, _, _, 3, _, _, _, _, _, _, 1],
  [1, _, 2, 2, _, _, _, _, _, _, _, _, 2, _, 4, _, _, 3, _, _, _, 4, _, 1],
  [1, _, _, _, _, _, 4, _, _, 2, 2, _, 2, _, _, _, _, _, _, 4, _, _, _, 1],
  [1, _, 3, _, _, _, 2, _, _, 2, _, _, 2, _, _, _, 4, _, _, _, _, 4, _, 1],
  [1, _, _, 3, _, _, 2, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, _, 1],
  [1, _, 3, _, _, _, _, _, _, _, 3, _, _, 3, 3, _, _, _, _, 3, 3, _, _, 1],
  [1, _, 3, _, _, _, 3, 3, _, 3, _, _, _, 3, 3, _, _, _, _, 2, 3, _, _, 1],
  [1, _, _, _, _, 3, _, 3, _, _, 3, _, _, _, _, _, _, _, _, _, _, _, _, 1],
  [1, _, 4, _, 3, _, _, _, _, 3, _, _, 2, _, _, _, _, _, _, _, _, 2, _, 1],
  [1, _, _, _, _, _, 4, _, _, _, _, _, 2, 2, _, _, _, _, _, _, 2, 2, _, 1],
  [1, _, _, 4, _, _, _, _, 4, _, _, _, _, 2, 2, 2, 2, 2, 2, 2, 2, _, _, 1],
  [1, _, _, _, _, _, _, _, _, _, 4, _, _, _, _, _, _, _, _, _, _, _, _, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// Screen settings
export const WIDTH = window.innerWidth
export const HEIGHT = window.innerHeight
export const PENTA_HEIGHT = 5 * HEIGHT
export const DOUBLE_HEIGHT = 2 * HEIGHT
export const HALF_WIDTH = Math.floor(WIDTH / 2)
export const HALF_HEIGHT = Math.floor(HEIGHT / 2)
export const TILE = 100
export const WORLD_WIDTH = TEXT_MAP[0].length * TILE
export const WORLD_HEIGHT = TEXT_MAP.length * TILE

// Minimap settings
export const MINIMAP_SCALE = 4
export const MAP_SCALE = 2 * MINIMAP_SCALE
export const MAP_TILE = Math.floor(TILE / MAP_SCALE)
export const MINIMAP_RES = [MAP_TILE * TEXT_MAP[0].length, MAP_TILE * TEXT_MAP.length]
export const MINIMAP_POS = [0, HEIGHT - MINIMAP_RES[1]]

// Ray casting settings
export const FOV = Math.PI / 3
export const HALF_FOV = FOV / 2
export const NUM_RAYS = Math.floor(WIDTH / 2)
export const MAX_DEPTH = 800
export const DELTA_ANGLE = FOV / NUM_RAYS
export const DIST = NUM_RAYS / (2 * Math.tan(HALF_FOV))
export const PROJ_COEFF = DIST * TILE
export const SCALE = Math.floor(WIDTH / NUM_RAYS)

// Texture settings
export const TEXTURE_WIDTH = 1200
export const TEXTURE_HEIGHT = 1200
export const TEXTURE_SCALE = Math.floor(TEXTURE_WIDTH / TILE)

// Sprite settings
export const DOUBLE_PI = Math.PI * 2
export const CENTER_RAY = Math.floor(NUM_RAYS / 2) - 1
export const FAKE_RAYS = 100
export const FAKE_RAYS_RANGE = NUM_RAYS - 1 + 2 * FAKE_RAYS

// Colors settings
export const COLORS = {
  white: '#fff',
  black: '#000',
  red: 'rgb(220, 0, 0)',
  green: 'rgb(0, 160, 0)',
  blue: 'rgb(0, 0, 220)',
  darkgray: 'rgb(30, 30, 30)',
  skyblue: 'rgb(0, 186, 255)',
  yellow: 'rgb(220, 220, 0)',
  darkbrown: 'rgb(97, 61, 25)',
  darkorange: 'rgb(255, 140, 0)'
}

// Player settings
export const PLAYER = {
  x: 150,
  y: 350,
  angle: 0,
  speed: 2
}
