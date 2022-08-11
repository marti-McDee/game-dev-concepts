/**  What is parallax scrolling? **

Parallax scrolling is a web design technique in which the website background moves at a slower pace than the foreground. This results in a 3D effect as visitors scroll down the site, adding a sense of depth and creating a more immersive browsing experience.


Parallax is based on optical illusion. Since the human eye perceives objects that are close to us as larger than things farther away, we perceive distant objects as if they were moving more slowly.  */

const
  canvas = document.getElementById('canvas1'),
  ctx = canvas.getContext('2d'),
  CANVAS_WIDTH = canvas.width = 800,
  CANVAS_HEIGHT = canvas.height = 700

let gameSpeed = 10


// const backgroundLayer1 = new Image()
// backgroundLayer1.src = 'layer-1.png'
// const backgroundLayer2 = new Image()
// backgroundLayer2.src = 'layer-2.png'
// const backgroundLayer3 = new Image()
// backgroundLayer3.src = 'layer-3.png'
// const backgroundLayer4 = new Image()
// backgroundLayer4.src = 'layer-4.png'
// const backgroundLayer5 = new Image()
// backgroundLayer5.src = 'layer-5.png'

// declare 5 new background layers
for (let i = 1; i < 6; i++) {
  const k = 'backgroundLayer'
  window[k + i] = new Image()
  window[k + i].src = `layer${i}.png`
}

addEventListener('load', () => {
  const slider = document.getElementById('slider')
  slider.value = gameSpeed
  const showGameSpeed = document.getElementById('showGameSpeed')
  showGameSpeed.innerHTML = gameSpeed
  slider.addEventListener('change', (e) => {
    gameSpeed = e.target.value
    showGameSpeed.innerHTML = e.target.value
  })

  // create a blueprint of the Layer object, then create instances of that class - one for each of five layers
  class Layer {
    constructor(image, speedModifier) {
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 700
      this.image = image
      this.speedModifier = speedModifier
      this.speed = gameSpeed * this.speedModifier
    }
    update() {
      this.speed = gameSpeed * this.speedModifier
      if (this.x <= -this.width) { this.x = 0 }
      this.x = this.x - this.speed
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
  }

  // put layers inside an array
  const layers = Array.from({ length: 5 }, (v, i) =>
    new Layer(window['backgroundLayer' + (i + 1)], 0.5)
  )

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)

    //cycle thorugh layers array to draw them
    layers.forEach(layer => {
      layer.update()
      layer.draw()
    })
    // gameFrame--
    requestAnimationFrame(animate)
  }

  animate()

})