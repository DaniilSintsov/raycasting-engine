import {
  CENTER_RAY,
  DELTA_ANGLE,
  DOUBLE_PI,
  FAKE_RAYS,
  HALF_FOV,
  HALF_HEIGHT,
  NUM_RAYS,
  PROJ_COEFF,
  SCALE,
  TILE
} from '../settings'
import {toDegrees} from '../utils/utils'

export class Sprites {
  constructor(...sprites) {
    this.spriteTypes = {
      'barrel': sprites[0],
      'pedestal': sprites[1],
      'cacodemon': sprites[2]
    }
    this.listOfObjects = [
      new SpriteObject(this.spriteTypes['barrel'], true, 7.1, 2.1, 1.8, 0.4),
      new SpriteObject(this.spriteTypes['barrel'], true, 5.9, 2.1, 1.8, 0.4),
      new SpriteObject(this.spriteTypes['pedestal'], true, 8.8, 2.5, 1.6, 0.5),
      new SpriteObject(this.spriteTypes['pedestal'], true, 8.8, 5.6, 1.6, 0.5),
      new SpriteObject(this.spriteTypes['cacodemon'], false, 7, 4, -1.5, 0.7)
    ]
  }
}

class SpriteObject {
  constructor(object, isStatic, posX, posY, shift, scale) {
    this.object = object
    this.isStatic = isStatic
    this.posX = posX * TILE
    this.posY = posY * TILE
    this.shift = shift
    this.scale = scale

    if (!isStatic) {
      this.spriteAngles = []
      for (let i = 0; i < 8; i++) {
        this.spriteAngles[i] = []
      }
      for (let i = 0; i < 360; i += 45) {
        for (let j = i; j < i + 45; j++) {
          this.spriteAngles[i / 45].push(j)
        }
      }
      this.spritePositions = new Map()
      this.spriteAngles.forEach((angle, pos) => {
        this.spritePositions.set(angle, this.object[pos])
      })
    }
  }

  objectLocate(player, walls) {
    const fakeWalls0 = []
    const fakeWalls1 = []
    for (let i = 0; i < FAKE_RAYS; i++) {
      fakeWalls0.push(walls[0])
    }
    for (let i = 0; i < FAKE_RAYS; i++) {
      fakeWalls1.push(walls[walls.length - 1])
    }
    const fakeWalls = [...fakeWalls0, ...walls, ...fakeWalls1]
    const dX = this.posX - player.posX
    const dY = this.posY - player.posY
    let distanceToSprite = Math.sqrt(dX ** 2 + dY ** 2)
    let theta = Math.atan2(dY, dX)
    let gamma = theta - player.getAngle
    if (dX > 0 && 180 <= toDegrees(player.getAngle) && toDegrees(player.getAngle) <= 360 || dX < 0 && dY < 0) {
      gamma += DOUBLE_PI
    }
    const deltaRays = Math.floor(gamma / DELTA_ANGLE)
    const currentRay = CENTER_RAY + deltaRays
    distanceToSprite *= Math.cos(HALF_FOV - currentRay * DELTA_ANGLE)
    const fakeRay = currentRay + FAKE_RAYS

    if (0 <= fakeRay && fakeRay <= NUM_RAYS - 1 + 2 * FAKE_RAYS && distanceToSprite < fakeWalls[fakeRay][0]) {
      if (!this.isStatic) {
        if (theta < 0) {
          theta += DOUBLE_PI
        }
        theta = 360 - toDegrees(theta)
        for (let angles of this.spriteAngles) {
          if (angles.includes(theta)) {
            this.object = this.spritePositions.get(this.spriteAngles[angles[0] / 45])
            break
          }
        }
      }
      const projHeight = Math.floor(PROJ_COEFF / distanceToSprite * this.scale)
      const halfProjHeight = Math.floor(projHeight / 2)
      const shift = halfProjHeight * this.shift
      const sprite = [this.object, currentRay * SCALE - halfProjHeight, HALF_HEIGHT - halfProjHeight + shift, projHeight, projHeight]
      return [distanceToSprite, sprite]
    } else {
      return false
    }
  }
}
