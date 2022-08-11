// Map
export const TEXT_MAP = [
  ['11111111111'],
  ['1.........1'],
  ['1..2...2..1'],
  ['1.........1'],
  ['1..2...2..1'],
  ['1.........1'],
  ['11111111111']
]

// Screen settings
export const WIDTH = window.innerWidth
export const HEIGHT = window.innerHeight
export const HALF_WIDTH = Math.floor(WIDTH / 2)
export const HALF_HEIGHT = Math.floor(HEIGHT / 2)
export const TILE = 100

// Minimap settings
export const MAP_SCALE = 5
export const MAP_TILE = TILE / MAP_SCALE
export const MINI_MAP_X = 0
export const MINI_MAP_Y = HEIGHT - MAP_TILE * TEXT_MAP.length

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
  x: TILE * 1.5,
  y: TILE * 1.5,
  angle: 0,
  speed: 2
}
