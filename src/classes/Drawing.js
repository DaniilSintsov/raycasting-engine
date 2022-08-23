import {
  COLORS,
  HALF_HEIGHT,
  HEIGHT,
  MAP_SCALE,
  MAP_TILE, MINIMAP_POS, MINIMAP_RES, MINIMAP_SCALE, TEXT_MAP, TILE,
  WIDTH
} from '../settings'
import {miniMap} from '../map'
import {toDegrees} from '../utils/utils'

function sorted(items, kwargs = {}) {
  const key = kwargs.key === undefined ? x => x : kwargs.key
  const reverse = kwargs.reverse === undefined ? false : kwargs.reverse
  const sortKeys = items.map((item, pos) => [key(item), pos])
  const comparator = Array.isArray(sortKeys[0][0])
    ? ((left, right) => {
      for (let n = 0; n < Math.min(left.length, right.length); n++) {
        const vLeft = left[n], vRight = right[n]
        const order = vLeft === vRight ? 0 : (vLeft > vRight ? 1 : -1)
        if (order !== 0) return order
      }
      return left.length - right.length
    })
    : ((left, right) => {
      const vLeft = left[0], vRight = right[0]
      return vLeft === vRight ? 0 : (vLeft > vRight ? 1 : -1)
    })
  sortKeys.sort(comparator)
  if (reverse) sortKeys.reverse()
  return sortKeys.map((order) => items[order[1]])
}

export class Drawing {
  constructor(context, ...textures) {
    this.context = context
    this.textures = {
      '1': textures[0],
      '2': textures[1],
      '3': textures[2],
      '4': textures[3],
      'S': textures[4]
    }
  }

  clear() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT)
  }

  background(playerAngle) {
    toDegrees(playerAngle)
    this.context.drawImage(this.textures['S'], 0, 0, WIDTH, HALF_HEIGHT)
    this.context.fillStyle = COLORS.darkgray
    this.context.fillRect(0, HALF_HEIGHT, WIDTH, HALF_HEIGHT)
  }

  world(worldObjects) {
    sorted(worldObjects, {key: n => n[0], reverse: true}).forEach(obj => {
      if (obj[0]) {
        const [_, object] = obj
        this.context.drawImage(...object)
      }
    })
  }

  miniMap(player) {
    const mapX = MINIMAP_POS[0] + Math.floor(player.posX / MAP_SCALE)
    const mapY = MINIMAP_POS[1] + Math.floor(player.posY / MAP_SCALE)

    this.context.fillStyle = COLORS.black
    this.context.fillRect(MINIMAP_POS[0], MINIMAP_POS[1], MINIMAP_RES[0], MINIMAP_RES[1])

    this.context.strokeStyle = COLORS.yellow
    this.context.beginPath()
    this.context.moveTo(mapX, mapY)
    this.context.lineTo(mapX + 11 * Math.cos(player.getAngle), mapY + 11 * Math.sin(player.getAngle))
    this.context.closePath()
    this.context.stroke()

    this.context.fillStyle = COLORS.darkorange
    this.context.beginPath()
    this.context.arc(mapX, mapY, 4, 0, Math.PI * 2)
    this.context.fill()

    miniMap.forEach(cell => {
      this.context.fillStyle = COLORS.darkbrown
      this.context.fillRect(cell[0] / TILE * MAP_TILE + MINIMAP_POS[0], cell[1] / TILE * MAP_TILE + MINIMAP_POS[1], MAP_TILE, MAP_TILE)
    })
  }
}
