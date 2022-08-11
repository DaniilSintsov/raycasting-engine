import {
  COLORS,
  HALF_HEIGHT, HALF_WIDTH,
  HEIGHT,
  MAP_SCALE,
  MAP_TILE,
  MINI_MAP_X,
  MINI_MAP_Y,
  TEXT_MAP,
  WIDTH
} from '../settings'
import {rayCasting} from '../rayCasting'
import {miniMap} from '../map'

export class Drawing {
  constructor(context, ...textures) {
    this.context = context
    this.textures = {
      '1': textures[0],
      '2': textures[1],
      'S': textures[2]
    }
  }

  clear() {
    this.context.clearRect(0, 0, WIDTH, HEIGHT)
  }

  background(playerAngle) {
    const skyOffset = -10 * (playerAngle * 180 / Math.PI) % WIDTH
    this.context.drawImage(this.textures['S'], skyOffset, 0, WIDTH, HALF_HEIGHT)
    this.context.drawImage(this.textures['S'], skyOffset - WIDTH, 0, WIDTH, HALF_HEIGHT)
    this.context.drawImage(this.textures['S'], skyOffset + WIDTH, 0, WIDTH, HALF_HEIGHT)
    this.context.fillStyle = COLORS.darkgray
    this.context.fillRect(0, HALF_HEIGHT, WIDTH, HALF_HEIGHT)
  }

  world(playerX, playerY, playerAngle) {
    rayCasting(this.context, playerX, playerY, playerAngle, this.textures)
  }

  miniMap(player) {
    const mapX = MINI_MAP_X + Math.floor(player.posX / MAP_SCALE)
    const mapY = MINI_MAP_Y + Math.floor(player.posY / MAP_SCALE)

    this.context.fillStyle = COLORS.black
    this.context.fillRect(MINI_MAP_X, MINI_MAP_Y, MAP_TILE * TEXT_MAP[0][0].length, MAP_TILE * TEXT_MAP.length)

    this.context.strokeStyle = COLORS.yellow
    this.context.beginPath()
    this.context.moveTo(mapX, mapY)
    this.context.lineTo(mapX + 12 * Math.cos(player.getAngle), mapY + 12 * Math.sin(player.getAngle))
    this.context.closePath()
    this.context.stroke()

    this.context.fillStyle = COLORS.darkorange
    this.context.beginPath()
    this.context.arc(mapX, mapY, 5, 0, Math.PI * 2)
    this.context.fill()

    miniMap.forEach(cell => {
      this.context.fillStyle = COLORS.darkbrown
      this.context.fillRect(cell[0] / MAP_SCALE + MINI_MAP_X, cell[1] / MAP_SCALE + MINI_MAP_Y, MAP_TILE, MAP_TILE)
    })
  }
}
