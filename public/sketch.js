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
  createP().addClass('diff').style('display', 'none').position(650, 110)
}

function draw() {
  background(76, 32, 147)
  menus.updateButtons(game.state)
  menus.renderButtons()

  if(game.state === 'menu') {
    frameRate(45)
    menus.renderMainMenu()
  } else if (game.state === 'draw-maze') {
    frameRate(60)
    game.drawMaze()
  } else if (game.state === 'game') {
    //game.checkForGameOver()
    game.checkForLevelCompleted()
    game.play()
  } else if(game.state === 'summary') {
    frameRate(45)
    menus.renderSummaryMenu()
  }
}

function keyPressed() {
  input.keyPressed(key)
}

function keyReleased() {
  input.keyReleased()
}

function mouseClicked() {
  input.mouseClicked(mouseX, mouseY)
}
