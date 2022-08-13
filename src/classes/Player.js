import {DOUBLE_PI, PLAYER} from '../settings'

export class Player {
  constructor() {
    this.x = PLAYER.x
    this.y = PLAYER.y
    this.angle = PLAYER.angle
  }

  get posX() {
    return this.x
  }

  get posY() {
    return this.y
  }

  get getAngle() {
    return this.angle
  }

  movement(pressedKeys) {
    const sin_a = Math.sin(this.angle)
    const cos_a = Math.cos(this.angle)
    if (pressedKeys.up) {
      this.x += PLAYER.speed * cos_a
      this.y += PLAYER.speed * sin_a
    }
    if (pressedKeys.down) {
      this.x += -PLAYER.speed * cos_a
      this.y += -PLAYER.speed * sin_a
    }
    if (pressedKeys.left) {
      this.x += PLAYER.speed * sin_a
      this.y += -PLAYER.speed * cos_a
    }
    if (pressedKeys.right) {
      this.x += -PLAYER.speed * sin_a
      this.y += PLAYER.speed * cos_a
    }
    if (pressedKeys.turnLeft) {
      this.angle -= 0.01
    }
    if (pressedKeys.turnRight) {
      this.angle += 0.01
    }
    this.angle = this.angle % DOUBLE_PI < 0 ? DOUBLE_PI + this.angle % DOUBLE_PI : this.angle % DOUBLE_PI
  }
}
