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

  this.renderMainMenu = function() {
    fill(39, 13, 81)
    rect(50, 50, 500, 450)
    fill(184, 159, 224)
    textFont("Freckle Face", 50)
    text("Zombio and Ghouliet", 300, 100)
    image(assets.ghouliet.state[3], 40, 130, 150, 150)
    image(assets.zombio.left[0], 450, 130, 100, 150)
    for(var i = 50; i < 500; i+=100) {
      image(assets.ground.top, i, 262, 100, 100)
      image(assets.ground.bottom, i, 362, 100, 100)
    }

    textFont("Freckle Face", 20)
    text("Help Zombio get to Ghouliet before she...", 300, 340)
    textFont("Freckle Face", 40)
    text("RUNS OUT OF TIME!", 300, 400)

    textFont("Freckle Face", 25)
    text("Use WASD to move Zombio", 300, 480)
  }

  this.renderSummaryMenu = function() {
    fill(39, 13, 81)
    noStroke()
    rect(50, 50, 500, 450)
    select('.timer').style('display', 'none')
    select('.level').style('display', 'none')
    fill(184, 159, 224)
    textFont("Freckle Face", 50)
    text('Game Over', 300, 100)
    textFont("Freckle Face", 30)
    text('Stats:', 120, 150)
    textAlign(LEFT)
    text('Levels beaten: ' + (level-1), 120, 200)
    text('Time survived: ' + floor(totalTime) + ' seconds', 120, 250)
    text('Distance travelled: ' + distance, 120, 300)
    text('Invalid moves: ' + badInput, 120, 350)
    text('Accuracy: ' + floor(optimalMoves / (optimalMoves + badInput) * 100) + '%', 120, 400)
  }
}
