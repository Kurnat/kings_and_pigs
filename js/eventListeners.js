window.addEventListener('keydown', ({ key }) => {
  if (player.preventInput) return
  switch (key.toLowerCase()) {
    case 'w':

      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]

        if (
          player.hitBox.position.x + player.hitBox.width <= door.position.x + door.width &&
          player.hitBox.position.x >= door.position.x &&
          player.hitBox.position.y + player.hitBox.height >= door.position.y &&
          player.hitBox.position.y <= door.position.y + door.height
        ) {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
          return
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -25
      break;
    case 'a': keys.a.presed = true
      break;
    case 'd': keys.d.presed = true
      break;
  }
})

window.addEventListener('keyup', ({ key }) => {

  switch (key.toLowerCase()) {
    case 'w':
      if (player.velocity.y === 0) player.velocity.y = 25
      break;
    case 'a': keys.a.presed = false
      break;
    case 'd': keys.d.presed = false
      break;
  }
})