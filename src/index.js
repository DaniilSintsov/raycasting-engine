import './css/styles.css'
import {WIDTH, HEIGHT} from './settings'
import {render} from './render'
import Stats from 'stats.js'

const canvas = document.createElement('canvas')
canvas.setAttribute('width', WIDTH)
canvas.setAttribute('height', HEIGHT)

const stats = new Stats()
stats.showPanel(0)

document.body.insertAdjacentElement('afterbegin', canvas)
document.body.insertAdjacentElement('afterbegin', stats.dom)


const context = canvas.getContext('2d')

const pressedKeys = {
  up: false,
  down: false,
  left: false,
  right: false,
  turnLeft: false,
  turnRight: false
}

let defTime = 0
let last = performance.now()
const fps = 1 / 60

function loop() {
  let now = performance.now()
  defTime += (now - last) / 1000
  while (defTime > fps) {
    defTime -= fps
  }
  last = now
  stats.begin()

  render(context, pressedKeys)

  stats.end()

  requestAnimationFrame(loop)
}

window.addEventListener('load', function () {
  loop()
})

document.onkeydown = function (e) {
  if (e.code === 'KeyW') pressedKeys.up = true
  if (e.code === 'KeyS') pressedKeys.down = true
  if (e.code === 'KeyA') pressedKeys.left = true
  if (e.code === 'KeyD') pressedKeys.right = true
  if (e.code === 'ArrowLeft') pressedKeys.turnLeft = true
  if (e.code === 'ArrowRight') pressedKeys.turnRight = true
}
document.onkeyup = function (e) {
  if (e.code === 'KeyW') pressedKeys.up = false
  if (e.code === 'KeyS') pressedKeys.down = false
  if (e.code === 'KeyA') pressedKeys.left = false
  if (e.code === 'KeyD') pressedKeys.right = false
  if (e.code === 'ArrowLeft') pressedKeys.turnLeft = false
  if (e.code === 'ArrowRight') pressedKeys.turnRight = false
}
