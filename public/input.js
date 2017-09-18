function Input() {
  this.touchStartX = 0
  this.touchStartY = 0
  this.newTouch = false

  this.mouseClicked = function(mouseX, mouseY) {
    if(game.state === 'menu') {
      var buttonClicked = menus.menuButtonClicked(mouseX, mouseY)
      if(buttonClicked) {
        game.startTime = millis()
        switch(buttonClicked) {
          case('easy'):
            menus.easyButtonPressed()
            break
          case('normal'):
            menus.normalButtonPressed()
            break
          case('hard'):
            menus.hardButtonPressed()
            break
          default:
        }
      }
    } else if(game.state === 'summary') {
      var buttonClicked = menus.summaryButtonClicked(mouseX, mouseY)
      if(buttonClicked) {
        game.state = buttonClicked.state
        game.size = game.startSize
        game.newGame()
      }
    }
  }

  this.touchEnded = function() {
    if(game.state === 'menu') {
      var buttonClicked = menus.menuButtonClicked(mouseX, mouseY)
      if(buttonClicked) {
        game.startTime = millis()
        switch(buttonClicked) {
          case('easy'):
            menus.easyButtonPressed()
            break
          case('normal'):
            menus.normalButtonPressed()
            break
          case('hard'):
            menus.hardButtonPressed()
            break
          default:
        }
      }
    } else if(game.state === 'summary') {
      var buttonClicked = menus.summaryButtonClicked(mouseX, mouseY)
      if(buttonClicked) {
        game.state = buttonClicked.state
        game.size = game.startSize
        game.newGame()
      }
    }
  }

  this.keyPressed = function(key) {
    if(key === 'W' || key === ' ') {
      game.jump()
    } else if(key === 'D') {
      game.setMoveDirection('right')
    } else if(key === 'A') {
      game.setMoveDirection('left')
    }
  }

  this.keyReleased = function() {
    if(key === 'D') game.stopMoving('right')
    if(key === 'A') game.stopMoving('left')
  }

  this.keyTyped = function() {
    if(key === 'm') {
      assets.mute()
    }

    if(game.state === 'game') {
      assets.stepZombeo(key)

      if((key === 'w' || key === ' ') && !game.maze.current.walls[0]) {
        game.moveUp()
      } else if(key === 'd' && !game.maze.current.walls[1]) {
        game.moveRight()
      } else if(key === 's' && !game.maze.current.walls[2]) {
        game.moveDown()
      } else if(key === 'a' && !game.maze.current.walls[3]) {
        game.moveLeft()
      } else if(key === 'w' || key === 'a' || key === 's' || key === 'd') {
        game.badInput++
      }
    }
  }

  this.touchStarted = function(mouseX, mouseY) {
    this.touchStartX = mouseX
    this.touchStartY = mouseY
    this.newTouch = true
  }

  this.touchMoved = function() {
    if(!this.newTouch) return
    this.newTouch = false
    var diffX = this.touchStartX - mouseX
    var diffY = this.touchStartY - mouseY
    if(Math.abs(diffX) > Math.abs(diffY)) {
      if(diffX > 0 && !game.maze.current.walls[3]) {
        assets.stepZombeo('a')
        game.moveLeft()
      } else if(!game.maze.current.walls[1]){
        assets.stepZombeo('d')
        game.moveRight()
      }
    } else {
      if(diffY > 0 && !game.maze.current.walls[0]) {
        assets.stepZombeo('w')
        game.moveUp()
      } else if(!game.maze.current.walls[2]) {
        assets.stepZombeo('s')
        game.moveDown()
      }
    }
  }
}
