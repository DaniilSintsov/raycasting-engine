import {Player} from './classes/Player'
import {Drawing} from './classes/Drawing'

const wall1 = document.getElementById('wall1')
const wall2 = document.getElementById('wall2')
const sky = document.getElementById('sky')

const player = new Player()

export function render(context, pressedKeys) {
  const drawing = new Drawing(context, wall1, wall2, sky)

  player.movement(pressedKeys)

  drawing.clear()
  drawing.background(player.getAngle)
  drawing.world(player.posX, player.posY, player.getAngle)
  drawing.miniMap(player)
}
