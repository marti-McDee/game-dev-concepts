const log = console.log

window.addEventListener('load', _ => {

  /** @type { HTMLCanvasElement }  **/

  const canvas = document.getElementById('canvas1')
  const ctx = canvas.getContext('2d')
  console.log(typeof canvas)
  const CANVAS_WIDTH = canvas.width = 1400
  const CANVAS_HEIGHT = canvas.height = 720
  let enemies = []
  let score = 0
  let gameOver = false
  const fullScreenButton = document.getElementById('fullScreenButton')

  /* will apply event listeners to keyboard events and hold an array of all currently active keys */
  class InputHandler {
    constructor() {
      this.keys = []
      this.touchY = ''
      this.touchThreshold = 100
      window.addEventListener('keydown', (e) => {

        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')
          && this.keys.indexOf(e.key) === -1) {
          this.keys.push(e.key)
        } else if (e.key === 'Enter' && gameOver) { restartGame() }
      })
      window.addEventListener('keyup', (e) => {

        if ((e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
          this.keys.splice(this.keys.indexOf(e.key), 1)
        }
      })
      window.addEventListener('touchstart', (e) => {
        this.touchY = e.changedTouches[0].pageY
      })
      window.addEventListener('touchmove', (e) => {
        const swipeDistance = e.changedTouches[0].pageY - this.touchY
        if (swipeDistance < -this.touchThreshold && this.keys.indexOf('swipe up') === -1) { this.keys.push('swipe up') }
        else if (swipeDistance > this.touchThreshold && this.keys.indexOf('swipe down') === -1) {
          this.keys.push('swipe down')
          if (gameOver) { restartGame() }
        }
      })
      window.addEventListener('touchend', (e) => {
        this.keys.splice(this.keys.indexOf('swipe up'), 1)
        this.keys.splice(this.keys.indexOf('swipe down'), 1)
      })
    }
  }

  /* react to keys as they are being pressed drawing and updating the Player */
  class Player {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 200
      this.height = 200
      this.x = 0
      this.y = this.gameHeight - this.height
      this.image = document.getElementById('playerImage')
      this.maxFrame = 8
      this.frameX = 0
      this.frameY = 0
      this.fps = 20  // will only affect how fast we swap between individual animation frames within Player spritesheet
      this.frameTimer = 0
      this.frameInterval = 1000 / this.fps
      this.speed = 0
      this.vy = 0
      this.weight = 1

    }

    restart() {
      this.x = 100
      this.y = this.gameHeight - this.height
      this.maxFrame = 8
      this.frameY = 0
    }

    draw(ctx) {
      // view the hitbox (circle)
      ctx.lineWidth = 5
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2 + 20, this.width / 3, 0, Math.PI * 2)
      ctx.stroke()

      ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height)
    }

    update(input, deltaTime, enemies) {
      // collision detection
      enemies.forEach((enemy) => {
        const dx = (enemy.x + enemy.width / 2 - 20) - (this.x + this.width / 2)
        const dy = (enemy.y + enemy.height / 3) - (this.y + this.height / 2)
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < enemy.width / 2 + this.width / 3) {
          gameOver = true
        }
      })

      // sprite animation
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) { this.frameX = 0 }
        else { this.frameX++ }
        this.frameTimer = 0
      } else {
        this.frameTimer += deltaTime
      }

      // controls

      if (input.keys.indexOf('ArrowRight') > -1) {
        this.speed = 5
      } else if (input.keys.indexOf('ArrowLeft') > -1) {
        this.speed = -5
      } else if ((input.keys.indexOf('ArrowUp') > -1 || input.keys.indexOf('swipe up') > -1) && this.onGround()) {
        this.vy -= 32
      }
      else {
        this.speed = 0
      }

      // horizontal movement
      this.x += this.speed
      if (this.x < 0) { this.x = 0 }
      else if (this.x > this.gameWidth - this.width) { this.x = this.gameWidth - this.width }


      // vertical movement
      this.y += this.vy
      if (!this.onGround()) {
        this.vy += this.weight
        this.maxFrame = 5
        this.frameY = 1
      } else {
        this.vy = 0
        this.maxFrame = 8
        this.frameY = 0
      }
      if (this.y > this.gameHeight - this.height) { this.y = this.gameHeight - this.height }
    }

    onGround() {
      return this.y >= this.gameHeight - this.height
    }
  }

  /* generate multiple enemies */
  class Enemy {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.width = 160
      this.height = 119
      this.image = document.getElementById('enemyImage')
      this.x = this.gameWidth
      this.y = this.gameHeight - this.height
      this.frameX = 0
      this.maxFrame = 5
      this.fps = 20  // will only affect how fast we swap between individual animation frames within Enemy spritesheet
      this.frameTimer = 0
      this.frameInterval = 1000 / this.fps
      this.speed = 8
      this.markedForDeletion = false
    }

    draw(ctx) {
      // view the hitbox (circle)
      ctx.lineWidth = 5
      ctx.strokeStyle = 'white'
      ctx.beginPath()
      ctx.arc(this.x + this.width / 2 - 20, this.y + this.height / 2, this.width / 3, 0, Math.PI * 2)
      ctx.stroke()

      ctx.drawImage(
        this.image, this.frameX * this.width, 0, this.width, this.height,
        this.x, this.y, this.width, this.height
      )
    }

    update(deltaTime) {
      if (this.frameTimer > this.frameInterval) {
        if (this.frameX >= this.maxFrame) { this.frameX = 0 }
        else { { this.frameX++ } }
        this.frameTimer = 0
      } else {
        this.frameTimer += deltaTime
      }
      this.x -= this.speed
      if (this.x < 0 - this.width) {
        this.markedForDeletion = true
        score++
      }
    }
  }

  /* handle endlessly scrolling background */
  class Background {
    constructor(gameWidth, gameHeight) {
      this.gameWidth = gameWidth
      this.gameHeight = gameHeight
      this.image = document.getElementById('backgroundImage')
      this.x = 0
      this.y = 0
      this.width = 2400
      this.height = 720
      this.speed = 7

    }

    restart() {
      this.x = 0
    }

    draw(ctx) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
      ctx.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
    }

    update() {
      this.x -= this.speed
      if (this.x < 0 - this.width) { this.x = 0 }
    }
  }

  /* add, animate, and remove enemies from game */
  function handleEnemies(deltaTime) {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT))
      randomEnemyInterval = Math.random() * 1000 + 500
      enemyTimer = 0
    } else {
      enemyTimer += deltaTime
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx)
      enemy.update(deltaTime)
    })
    enemies = enemies.filter((enemy) => !enemy.markedForDeletion)
  }

  /* handle things like displaying score, game over message */
  function displayStatusText(ctx) {
    ctx.textAlign = 'left'
    ctx.fillStyle = 'black'
    ctx.font = '40px Helvetica, serif'
    ctx.fillText('Score: ' + score, 20, 50)
    ctx.fillStyle = 'white'
    ctx.fillText('Score: ' + score, 20, 52)
    if (gameOver) {
      ctx.textAlign = 'center'
      ctx.fillStyle = 'black'
      ctx.fillText('GAME OVER, press ENTER or swipe down to restart!', CANVAS_WIDTH / 2, 200)
      ctx.fillStyle = 'white'
      ctx.fillText('GAME OVER, press ENTER or swipe down to restart!', CANVAS_WIDTH / 2 + 2, 200)
    }
  }

  function restartGame() {
    player.restart()
    background.restart()
    enemies = []
    score = 0
    gameOver = false
    animate(0)
  }

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen()
        .catch(err => { alert(`Error, can't enable full-screen mode: ${err.message}`) })
    } else {
      document.exitFullscreen()
    }
  }

  fullScreenButton.addEventListener('click', toggleFullScreen)

  const input = new InputHandler()
  const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT)
  const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT)
  const enemy1 = new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT)

  let lastTime = 0
  let enemyTimer = 0
  let enemyInterval = 2000
  let randomEnemyInterval = Math.random() * 1000 + 500

  /* update and draw the game repeatedly */
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime
    lastTime = timeStamp
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
    background.draw(ctx)
    // background.update()
    player.draw(ctx)
    player.update(input, deltaTime, enemies)
    handleEnemies(deltaTime)
    displayStatusText(ctx)
    if (!gameOver) { requestAnimationFrame(animate) }
  }

  animate(0)





})