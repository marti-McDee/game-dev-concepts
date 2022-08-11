/** @type { HTMLCanvasElement }  **/

const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 1000

let gameFrame = 0

class Enemy {
  constructor() {
    this.image = new Image()
    this.image.src = 'sprites/enemies/enemy3.png'

    this.speed = (Math.random() * 4) + 1
    this.spriteWidth = 218
    this.spriteHeight = 177
    this.width = this.spriteWidth / 2.5
    this.height = this.spriteHeight / 2.5
    this.x = Math.random() * (canvas.width - this.width)
    this.y = Math.random() * (canvas.height - this.height)
    this.frame = 0

    // wrapped in Math.floor() so that gameFrame will be a whole number
    this.flapSpeed = Math.floor((Math.random() * 3) + 1)
    this.angle = 0
    this.angleSpeed = Math.random() * 2 + 0.5
    this.curve = Math.random() * 200 + 50
  }
  update() {
    // we will get 4 horizontal cycles for every 1 vertical cycle, 360/90 = 4
    this.x = canvas.width / 2 * Math.cos(this.angle * Math.PI / 90) + (canvas.width / 2 - this.width / 2)
    this.y = canvas.height / 2 * Math.sin(this.angle * Math.PI / 360) + (canvas.height / 2 - this.height / 2)
    this.angle += this.angleSpeed
    if (this.x + this.width < 0) { this.x = canvas.width }
    this.y++;
    if (gameFrame % 2 === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++
    }
  }
  draw() {
    ctx.drawImage(this.image, this.frame * this.spriteWidth, this.frame * this.spriteHeight, this.x, this.y, this.spriteHeight, this.x, this.y, this.width, this.height)
  }
}

const enemiesArray = Array.from({ length: 200 }, _ => new Enemy())

const animate = () => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
  enemiesArray.forEach((enemy) => {
    enemy.update()
    enemy.draw()
  })
  gameFrame++
  requestAnimationFrame(animate)
}

animate()