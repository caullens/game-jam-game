function Menus() {
  this.buttons = {
    easy: new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu']),
    normal: new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Normal", ['menu']),
    hard: new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hardcore", ['menu']),
    reset: new Button({x: 130, y: 550}, {width: 150, height: 40}, 'draw-maze', "Try Again", ['summary']),
    menu: new Button({x: 330, y: 550}, {width: 150, height: 40}, 'menu', "Menu", ['summary'])
  }

  this.updateButtons = function(state) {
    this.buttons.easy.update(state)
    this.buttons.normal.update(state)
    this.buttons.hard.update(state)
    this.buttons.reset.update(state)
    this.buttons.menu.update(state)
  }

  this.renderButtons = function() {
    this.buttons.easy.render()
    this.buttons.normal.render()
    this.buttons.hard.render()
    this.buttons.reset.render()
    this.buttons.menu.render()
  }

  this.menuButtonClicked = function(mouseX, mouseY) {
    if(this.buttons.easy.isClicked(mouseX, mouseY)) return 'easy'
    if(this.buttons.normal.isClicked(mouseX, mouseY)) return 'normal'
    if(this.buttons.hard.isClicked(mouseX, mouseY)) return 'hard'
    return undefined
  }

  this.summaryButtonClicked = function(mouseX, mouseY) {
    if(this.buttons.reset.isClicked(mouseX, mouseY)) return this.buttons.reset
    if(this.buttons.menu.isClicked(mouseX, mouseY)) return this.buttons.menu
    return undefined
  }

  this.mainMenuFont = {
    size: 40,
    growing: true
  }
  this.zombeoX = 450
  this.renderMainMenu = function() {
    frameRate(45)
    if(this.mainMenuFont.growing) {
      this.mainMenuFont.size += 1
      if(this.mainMenuFont.size >= 50) this.mainMenuFont.growing = false
    } else {
      this.mainMenuFont.size -= 1
      if(this.mainMenuFont.size <= 30) this.mainMenuFont.growing = true
    }
    if(frameCount%3 === 0) {
      assets.titleStepZombeo()
      assets.titleStepGhouliet()
    }
    this.zombeoX-=2
    if(this.zombeoX <= 150) {
      this.zombeoX = 450
      assets.resetGhoulietCounter()
    }

    fill(39, 13, 81)
    rect(50, 50, 500, 450)
    fill(184, 159, 224)
    textFont("Freckle Face", 50)
    text("Zombeo and Ghouliet", 300, 100)
    for(var i = 50; i < 500; i+=100) {
      image(assets.ground.top, i, 262, 100, 100)
      image(assets.ground.bottom, i, 362, 100, 100)
    }
    image(assets.ghouliet.titleAnimation[assets.ghouliet.counter], 40, 130, 150, 150)
    image(assets.zombeo.titleAnimation[assets.zombeo.counter], this.zombeoX, 130, 100, 150)

    textFont("Freckle Face", 20)
    text("Help Zombeo get to Ghouliet before she...", 300, 340)
    textFont("Freckle Face", this.mainMenuFont.size)
    text("RUNS OUT OF TIME!", 300, 400)

    textFont("Freckle Face", 25)
    text("Use WASD to move Zombeo", 300, 480)
  }

  this.renderSummaryMenu = function() {
    fill(39, 13, 81)
    noStroke()
    rect(50, 50, 500, 450)
    select('.timer').style('display', 'none')
    select('.level').style('display', 'none')
    select('.diff').style('display', 'none')
    fill(184, 159, 224)
    textFont("Freckle Face", 50)
    text('Game Over', 300, 100)
    textFont("Freckle Face", 30)
    text('Stats:', 120, 150)
    textAlign(LEFT)
    text('Levels beaten: ' + (game.level-1), 120, 200)
    text(select('.diff').html(), 120, 250)
    text('Time survived: ' + floor(game.totalTime) + ' seconds', 120, 300)
    text('Distance travelled: ' + game.distance, 120, 350)
    text('Invalid moves: ' + game.badInput, 120, 400)
    text('Accuracy: ' + floor(game.optimalMoves / (game.optimalMoves + game.badInput) * 100) + '%', 120, 450)

    image(assets.zombeo.endAnimation[assets.zombeo.counter], 400, 60, 150, 150)
    if(frameCount%3 === 0) assets.endStepZombeo()
  }

  this.easyButtonPressed = function() {
    game.state = this.buttons.easy.state
    game.easy = true
    game.med = false
    game.hard = false
  }

  this.normalButtonPressed = function() {
    game.state = this.buttons.normal.state
    game.easy = false
    game.med = true
    game.hard = false
  }

  this.hardButtonPressed = function() {
    game.state = this.buttons.hard.state
    game.easy = false
    game.med = false
    game.hard = true
  }
}
