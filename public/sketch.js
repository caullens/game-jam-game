var touchStartX, touchStartY
var newTouch

function preload() {
  assets = new Assets()
  document.addEventListener('touchstart', function(e) {e.preventDefault()}, false);
  document.addEventListener('touchmove', function(e) {e.preventDefault()}, false);
}

function setup() {
  assets.music.loop()
  input = new Input()
  game = new Game()
  game.newGame()
  menus = new Menus()
  createP().addClass('timer').style('display', 'none').position(650, 70)
  createP().addClass('level').style('display', 'none').position(650, 30)
}

function draw() {
  background(76, 32, 147)
  menus.updateButtons(game.state)
  menus.renderButtons()

  game.checkForGameOver()
  game.checkForLevelCompleted()

  if(game.state === 'menu') {
    menus.renderMainMenu()
  } else if (game.state === 'draw-maze') {
    frameRate(60)
    game.drawMaze()
  } else if (game.state === 'game') {
    game.play()
  } else if(game.state === 'summary') {
    menus.renderSummaryMenu()
  }
}

function mouseClicked() {
  input.mouseClicked(mouseX, mouseY)
}

function touchEnded() {
  input.touchEnded()
}

function keyTyped() {
  input.keyTyped()
}

function touchStarted() {
  input.touchStarted(mouseX, mouseY)
}

function touchMoved() {
  input.touchMoved()
}
