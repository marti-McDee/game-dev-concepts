const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width = 500
const CANVAS_HEIGHT = canvas.height = 500
const explosions = []
let canvasPosition = canvas.getBoundingClientRect()

class Explosion {
  constructor(x, y) {

    this.spriteWidth = 200
    this.spriteHeight = 179

    // width and height are divided by same number, in order to keep the same aspect ratio
    this.width = this.spriteWidth * 0.7
    this.height = this.spriteHeight * 0.7
    this.x = x
    this.y = y

    this.image = new Image()
    this.image.src = 'images/boom.png'
    this.frame = 0
    this.timer = 0
    this.angle = Math.random() * 6.2
    this.sound = new Audio()
    this.sound.src = '../assets/sfx/Misc 02.wav'
  }

  update() {
    if (this.frame === 0) { this.sound.play() }
    this.timer++
    if (this.timer % 10 === 0) {
      this.frame++
    }
  }

  draw() {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    // drawImage() takes 3, 5, or 9 args (depending on how much ctrl you want over your image)
    // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)
    ctx.drawImage(
      this.image, this.spriteWidth * this.frame, 0, this.spriteWidth, this.spriteHeight,
      0 - this.width / 2, 0 - this.height / 2, this.width, this.height
    )
    ctx.restore()
  }
}

window.addEventListener('click', (e) => {
  createAnimation(e)
})

function createAnimation(e) {
  let positionX = e.x - canvasPosition.left
  let positionY = e.y - canvasPosition.top
  explosions.push(new Explosion(positionX, positionY))
}

function animate() {
  explosions.forEach((explosion, i) => {
    explosion.update()
    explosion.draw()
    if (explosion.frame > 5) {
      explosions.splice(i, 1)
      i--
    }
  })
  requestAnimationFrame(animate)
}

animate()