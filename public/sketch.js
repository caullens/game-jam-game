var state
var size
var columns
var step
var dir
var timer
var easy, med, hard
var startTime
var startSize
var exitX
var exitY
var level
var distance
var totalTime
var badInput
var optimalMoves
var depth
var touchStartX, touchStartY
var newTouch

function preload() {
  assets = new Assets()
  document.addEventListener('touchstart', function(e) {e.preventDefault()}, false);
  document.addEventListener('touchmove', function(e) {e.preventDefault()}, false);
}

function setup() {
  assets.music.loop()
  state = 'menu'
  startSize = 150
  size = startSize
  newGame()
  generateMaze()
  distance = 0
  menus = new Menus()
  createP().addClass('timer').style('display', 'none').position(650, 70)
  createP().addClass('level').style('display', 'none').position(650, 30)
}

function newGame() {
  level = 0
  totalTime = 0
  badInput = 0
  depth = 0
  optimalMoves = 0
  distance = 0
}

function generateMaze() {
  level = level + 1
  maze = new Maze(size, assets.cellTextures, level)
  maze.setup()
  columns = floor(width/size)
  startTime = millis()
  depth = 0

  step = true
  dir = true
  assets.resetZombioCounter()
  exitX = Math.floor((Math.random() * columns))
  exitY = Math.floor((Math.random() * columns))
  while(dist(maze.current.i * maze.current.w, maze.current.j * maze.current.w, exitX * maze.current.w, exitY * maze.current.w) < 200) {
    exitX = Math.floor((Math.random() * columns))
    exitY = Math.floor((Math.random() * columns))
  }
  assets.resetGhoulietCounter()
}

function draw() {
  background(76, 32, 147)
  menus.updateButtons(state)
  menus.renderButtons()

  var elapsedTime = (millis() - startTime) / 1000
  if(state !== 'draw-maze' && state !== 'menu' && elapsedTime >= timer) {
    if(state !== 'summary') {
      totalTime += elapsedTime
    }
    state = 'summary'
  }

  if(atExitTile() && state !== 'draw-maze') {
    size = findNextDivisible(600, size)
    totalTime += elapsedTime
    generateMaze()
    state = 'draw-maze'
  }

  if(state === 'menu') {
    menus.renderMainMenu()
  } else if (state === 'draw-maze') {
    frameRate(60)
    assets.resetZombioCounter()
    assets.resetGhoulietCounter()
    maze.draw();
    maze.current.highlight(assets.tombStone)
    if(maze.current.i === 0 && maze.current.j === 0) {
      search = new Search(maze)
      depth = search.findExit(exitX, exitY)
      timer = floor(depth/level)
      optimalMoves += depth
      if(easy) timer = ceil(timer * 1.5)
      else if(hard) timer = ceil(timer * 0.5)
      state = 'game'
      startTime = millis()
    }

    var para = select('.timer')
    var levelP = select('.level')
    para.show()
    levelP.show()
    para.html("Generating maze...")
    levelP.html("Level: " + level)
  } else if (state === 'game') {
    maze.draw()
    maze.current.highlight(assets.getZombio())
    assets.setGhoulietState(elapsedTime, timer)
    maze.grid[exitX + exitY * columns].highlight(assets.getGhouliet())

    var para = select('.timer')
    var levelP = select('.level')
    para.show()
    levelP.show()
    para.html((floor(timer - elapsedTime) + 1) + ' seconds remaining')
    levelP.html("Level: " + level)
  } else if(state === 'summary') {
    menus.renderSummaryMenu()
  }
}

function mouseClicked() {
  if(state === 'menu') {
    var buttonClicked = menus.menuButtonClicked(mouseX, mouseY)
    if(buttonClicked) {
      startTime = millis()
      switch(buttonClicked) {
        case('easy'):
          state = menus.buttons.easy.state
          easy = true
          med = false
          hard = false
          break
        case('normal'):
          state = menus.buttons.normal.state
          easy = false
          med = true
          hard = false
          break
        case('hard'):
          state = menus.buttons.hard.state
          easy = false
          med = false
          hard = true
          break
        default:
      }
    }
  } else if(state === 'summary') {
    var buttonClicked = menus.summaryButtonClicked(mouseX, mouseY)
    if(buttonClicked) {
      state = buttonClicked.state
      size = startSize
      newGame()
      generateMaze()
    }
  }
}

function touchEnded() {
  if(state === 'menu') {
    var buttonClicked = menus.menuButtonClicked(mouseX, mouseY)
    if(buttonClicked) {
      startTime = millis()
      switch(buttonClicked) {
        case('easy'):
          state = menus.buttons.easy.state
          easy = true
          med = false
          hard = false
          break
        case('normal'):
          state = menus.buttons.normal.state
          easy = false
          med = true
          hard = false
          break
        case('hard'):
          state = menus.buttons.hard.state
          easy = false
          med = false
          hard = true
          break
        default:
      }
    }
  } else if(state === 'summary') {
    var buttonClicked = menus.summaryButtonClicked(mouseX, mouseY)
    if(buttonClicked) {
      state = buttonClicked.state
      size = startSize
      newGame()
      generateMaze()
    }
  }
}

function touchStarted() {
  touchStartX = mouseX
  touchStartY = mouseY
  newTouch = true
}

function touchMoved() {
  if(!newTouch) return
  newTouch = false
  var diffX = touchStartX - mouseX
  var diffY = touchStartY - mouseY
  if(Math.abs(diffX) > Math.abs(diffY)) {
    if(diffX > 0 && !maze.current.walls[3]) {
      assets.stepZombio('a')
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) - 1]
      maze.current.highlight(assets.getZombio())
    } else if(!maze.current.walls[1]){
      assets.stepZombio('d')
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) + 1]
      maze.current.highlight(assets.getZombio())
    }
  } else {
    if(diffY > 0 && !maze.current.walls[0]) {
      assets.stepZombio('w')
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j-1)]
    } else if(!maze.current.walls[2]) {
      assets.stepZombio('s')
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j+1)]
    }
  }
}

function keyTyped() {
  if(key === 'm') {
    if(assets.music.isPlaying()) assets.music.pause()
    else assets.music.play()
  }

  if(state === 'game') {
    assets.stepZombio(key)

    if(key === 'w' && !maze.current.walls[0]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j-1)]
    } else if(key === 'd' && !maze.current.walls[1]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) + 1]
      maze.current.highlight(assets.getZombio())
    } else if(key === 's' && !maze.current.walls[2]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j+1)]
    } else if(key === 'a' && !maze.current.walls[3]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) - 1]
      maze.current.highlight(assets.getZombio())
    } else if(key === 'w' || key === 'a' || key === 's' || key === 'd') {
      badInput++
    }
  }
}

function atExitTile() {
  return (maze.current.i === exitX && maze.current.j === exitY)
}

function findNextDivisible(divisor, current) {
  while(current > 0 && divisor % --current != 0) {
    //do nothing
  }
  return current
}
