import {
  DELTA_ANGLE,
  HALF_FOV,
  HALF_HEIGHT, HEIGHT,
  NUM_RAYS,
  PROJ_COEFF,
  SCALE, TEXTURE_HEIGHT, TEXTURE_SCALE,
  TILE, WIDTH
} from './settings'
import {worldMap} from './map'

function mapping(a) {
  return Math.floor(a / TILE) * TILE
}

export function rayCasting(player, textures) {
  const walls = []
  const xM = mapping(player.posX)
  const yM = mapping(player.posY)
  let curAngle = player.getAngle - HALF_FOV

  for (let ray = 0; ray < NUM_RAYS; ray++) {
    const sin_a = Math.sin(curAngle)
    const cos_a = Math.cos(curAngle)
    let isBrokenV = false
    let isBrokenH = false
    let depthV, depthH
    let yV, xH
    let textureV, textureH

    // For verticals
    let x = cos_a >= 0 ? xM + TILE : xM
    let dX = cos_a >= 0 ? 1 : -1
    for (let i = 0; i < WIDTH; i += TILE) {
      depthV = (x - player.posX) / cos_a
      yV = player.posY + depthV * sin_a
      for (let cell of worldMap.keys()) {
        if (cell[0] === mapping(x + dX) && cell[1] === mapping(yV)) {
          textureV = worldMap.get(cell)
          isBrokenV = true
        }
      }
      if (isBrokenV) {
        break
      }
      x += dX * TILE
    }

    // For horizontals
    let y = sin_a >= 0 ? yM + TILE : yM
    let dY = sin_a >= 0 ? 1 : -1
    for (let i = 0; i < HEIGHT; i += TILE) {
      depthH = (y - player.posY) / sin_a
      xH = player.posX + depthH * cos_a
      for (let cell of worldMap.keys()) {
        if (cell[0] === mapping(xH) && cell[1] === mapping(y + dY)) {
          textureH = worldMap.get(cell)
          isBrokenH = true
        }
      }
      if (isBrokenH) {
        break
      }
      y += dY * TILE
    }

    // Projection
    let depth = depthV < depthH ? depthV : depthH
    let offset = depthV < depthH ? yV : xH
    const texture = depthV < depthH ? textureV : textureH
    offset = Math.floor(offset) % TILE
    depth *= Math.cos(player.getAngle - curAngle)
    depth = Math.max(depth, 0.00001)
    const projHeight = Math.min(Math.floor(PROJ_COEFF / depth), 2 * HEIGHT)
    // if (texture) {
    //   context.drawImage(textures[texture], offset * TEXTURE_SCALE, 0, TEXTURE_SCALE, TEXTURE_HEIGHT, ray * SCALE, HALF_HEIGHT - Math.floor(proj_height / 2), SCALE, proj_height)
    // } else {
    //   context.fillStyle = COLORS.black
    //   context.fillRect(ray * SCALE, HALF_HEIGHT - Math.floor(proj_height / 2), SCALE, proj_height)
    // }
    const wall = [textures[texture], offset * TEXTURE_SCALE, 0, TEXTURE_SCALE, TEXTURE_HEIGHT, ray * SCALE, HALF_HEIGHT - Math.floor(projHeight / 2), SCALE, projHeight]
    walls.push([depth, wall])
    curAngle += DELTA_ANGLE
  }
  return walls
}
