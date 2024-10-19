class Player extends Sprite {
  constructor({
    collisionBlocks = [],
    imageSrc,
    frameRate,
    animations,
    loop
  }) {
    super({ imageSrc, frameRate, animations, loop })
    this.position = {
      x: 200,
      y: 200
    }

    this.velocity = {
      x: 0,
      y: 0
    }

    this.sides = {
      top: 0,
      bottom: (this.position.y + this.height || 0),
      left: 0,
      right: (this.position.x + this.width) || 0
    }
    this.gravity = 1
    this.collisionBlocks = collisionBlocks
  }

  update() {
    this.position.x += this.velocity.x

    this.updateHitBox()
    this.checkForHorizontalCollision()
    this.applyGravity()
    this.updateHitBox()
    this.checkForVerticalCollision()
  }

  handleInput(keys) {
    if(this.preventInput) return
    this.velocity.x = 0
    if (keys.d.presed) {
      this.switchSprite('runRight')
      this.velocity.x = 5
      this.lastDirection = 'right'
    } else if (keys.a.presed) {
      this.switchSprite('runLeft')
      this.velocity.x = -5
      this.lastDirection = 'left'
    } else {
      if (this.lastDirection === 'left') this.switchSprite('idleLeft')
      else this.switchSprite('idleRight')
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return
    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameBuffer = this.animations[name].frameBuffer
    this.loop = this.animations[name].loop
    this.currentAnimation = this.animations[name]
  }

  updateHitBox() {
    this.hitBox = {
      position: {
        x: this.position.x + 58,
        y: this.position.y + 34
      },
      width: 50,
      height: 53
    }
  }

  applyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      // if a collision exist
      if (
        this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on x axis going to the left
        if (this.velocity.x < 0) {
          const offset = this.hitBox.position.x - this.position.x
          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
          break
        }

        if (this.velocity.x > 0) {
          const offset = this.hitBox.position.x - this.position.x + this.hitBox.width
          this.position.x = collisionBlock.position.x - offset - 0.01
          break
        }
      }
    }
  }

  checkForVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]

      if (
        this.hitBox.position.x <= collisionBlock.position.x + collisionBlock.width &&
        this.hitBox.position.x + this.hitBox.width >= collisionBlock.position.x &&
        this.hitBox.position.y + this.hitBox.height >= collisionBlock.position.y &&
        this.hitBox.position.y <= collisionBlock.position.y + collisionBlock.height
      ) {
        // collision on y axis going to the left
        if (this.velocity.y < 0) {
          this.velocity.y = 0
          const offset = this.hitBox.position.y - this.position.y
          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }

        if (this.velocity.y > 0) {
          this.velocity.y = 0
          const offset = this.hitBox.position.y - this.position.y + this.hitBox.height
          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }
      }
    }
  }
}