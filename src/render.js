import {Player} from './classes/Player'
import {Drawing} from './classes/Drawing'
import {rayCasting} from './rayCasting'
import {Sprites} from './classes/Sprites'

const wall1 = document.getElementById('wall1')
const wall2 = document.getElementById('wall2')
const wall3 = document.getElementById('wall3')
const wall4 = document.getElementById('wall4')
const sky = document.getElementById('sky')
const barrel = document.getElementById('barrel')
const pedestal = document.getElementById('pedestal')

const cacodemons = []
for (let i = 0; i < 8; i++) {
  cacodemons.push(document.getElementById(`cacodemon${i}`))
}

const player = new Player()
const sprites = new Sprites(barrel, pedestal, cacodemons)

export function render(context, pressedKeys) {
  const drawing = new Drawing(context, wall1, wall2, wall3, wall4, sky)

  player.movement(pressedKeys)

  drawing.clear()
  drawing.background(player.getAngle)
  const walls = rayCasting(player, drawing.textures)
  const spriteProps = []
  sprites.listOfObjects.forEach(obj => {
    spriteProps.push(obj.objectLocate(player))
  })
  drawing.world([...walls, ...spriteProps])
  drawing.miniMap(player)
}
