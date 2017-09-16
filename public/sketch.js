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

function setup() {
  assets = new Assets()
  state = 'menu'
  startSize = 150
  size = startSize
  newGame()
  generateMaze()
  distance = 0
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Normal", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hardcore", ['menu'])
  restartButton = new Button({x: 130, y: 550}, {width: 150, height: 40}, 'draw-maze', "Try Again", ['summary'])
  mainMenuButton = new Button({x: 330, y: 550}, {width: 150, height: 40}, 'menu', "Menu", ['summary'])
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
  easyButton.update(state)
  mediumButton.update(state)
  hardButton.update(state)
  restartButton.update(state)
  mainMenuButton.update(state)

  easyButton.render()
  mediumButton.render()
  hardButton.render()
  restartButton.render()
  mainMenuButton.render()

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
    renderMainMenu()
  } else if (state === 'draw-maze') {
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
    renderSummaryPage()
  }
}

function renderMainMenu() {
  fill(39, 13, 81)
  rect(50, 50, 500, 450)
  fill(184, 159, 224)
  textFont("Freckle Face", 50)
  text("Zombio and Ghouliet", 300, 100)
  image(assets.ghouliet.state[1], 40, 130, 150, 150)
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

function renderSummaryPage() {
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

function mouseClicked() {
  if(state === 'menu') {
    if(easyButton.isClicked(mouseX, mouseY)) {
      state = easyButton.state
      easy = true
      med = false
      hard = false
      startTime = millis()
    }
    if(mediumButton.isClicked(mouseX, mouseY)) {
      state = mediumButton.state
      easy = false
      med = true
      hard = false
      startTime = millis()
    }
    if(hardButton.isClicked(mouseX, mouseY)) {
      state = hardButton.state
      easy = false
      med = false
      hard = true
      startTime = millis()
    }
  } else if(state === 'summary') {
    if(restartButton.isClicked(mouseX, mouseY)) {
      size = startSize
      newGame()
      generateMaze()
      state = restartButton.state
    }
    if(mainMenuButton.isClicked(mouseX, mouseY)) {
      state = mainMenuButton.state
      size = startSize
      newGame()
      generateMaze()
    }
  }
}

function keyTyped() {
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
