var state
var size
var columns
var step
var sprite
var dir
var timer
var easy, med, hard
var startTime
var startSize
var exitX
var exitY
var exitSprite
var tombStone
var r1
var r2
var l1
var l2
var e
var dirt
var cellTextures
var level
var distance
var totalTime
var badInput
var optimalMoves
var depth
var ground

function setup() {
  //frameRate(5);
  state = 'menu'
  startSize = 150
  size = startSize
  newGame()

  tombStone = loadImage('/assets/TS.png')
  r1 = loadImage('/assets/R1.png')
  r2 = loadImage('/assets/R2.png')
  l1 = loadImage('/assets/L1.png')
  l2 = loadImage('/assets/L2.png')
  e = [
    loadImage('/assets/E1.png'),
    loadImage('/assets/E2.png'),
    loadImage('/assets/E3.png'),
    loadImage('/assets/E4.png')
  ]
  cellTextures = {
    dirt : [
    loadImage('/assets/dirt1.png'),
    loadImage('/assets/dirt2.png'),
    loadImage('/assets/dirt3.png'),
    loadImage('/assets/dirt4.png')
    ],
    walls : [
      loadImage('/assets/wallh.png'),
      loadImage('/assets/wallv.png')
    ]
  }
  ground = loadImage('/assets/groundT.png')
  groundBottom = loadImage('/assets/groundB.png')

  generateMaze()
  distance = 0
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Normal", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hardcore", ['menu'])
  restartButton = new Button({x: 130, y: 550}, {width: 150, height: 40}, 'draw-maze', "Try Again", ['summary'])
  mainMenuButton = new Button({x: 330, y: 550}, {width: 150, height: 40}, 'menu', "Menu", ['summary'])
  createP().addClass('timer').style('display', 'none').position(650, 70)
  createP().addClass('level').style('display', 'none').position(650, 30)

  select('.inst').position(10, 650)
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
  maze = new Maze(size, cellTextures, level)
  maze.setup()
  columns = floor(width/size)
  startTime = millis()
  depth = 0

  step = true
  dir = true
  sprite = r1
  exitX = Math.floor((Math.random() * columns))
  exitY = Math.floor((Math.random() * columns))
  while(dist(maze.current.i * maze.current.w, maze.current.j * maze.current.w, exitX * maze.current.w, exitY * maze.current.w) < 200) {
    exitX = Math.floor((Math.random() * columns))
    exitY = Math.floor((Math.random() * columns))
  }
  exitSprite = e[0]
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
    maze.current.highlight(tombStone)
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
    maze.current.highlight(sprite)
    setExitSprite()
    maze.grid[exitX + exitY * columns].highlight(exitSprite)

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
  fill("black")
  text("Zombio and Ghouliet", 300, 100)
  image(e[2], 40, 130, 150, 150)
  image(l1, 450, 130, 100, 150)
  image(ground, 50, 262, 100, 100)
  image(ground, 150, 262, 100, 100)
  image(ground, 250, 262, 100, 100)
  image(ground, 350, 262, 100, 100)
  image(ground, 450, 262, 100, 100)
  image(groundBottom, 50, 362, 100, 100)
  image(groundBottom, 150, 362, 100, 100)
  image(groundBottom, 250, 362, 100, 100)
  image(groundBottom, 350, 362, 100, 100)
  image(groundBottom, 450, 362, 100, 100)
}

function renderSummaryPage() {
  fill(39, 13, 81)
  noStroke()
  rect(50, 50, 500, 450)
  select('.timer').style('display', 'none')
  select('.level').style('display', 'none')
  fill('black')
  text('Game Over', 300, 100)
  text('Stats:', 120, 150)
  textAlign(LEFT)
  text('Levels beaten: ' + (level-1), 120, 200)
  text('Time survived: ' + floor(totalTime) + ' seconds', 120, 250)
  text('Distance travelled: ' + distance, 120, 300)
  text('Invalid moves: ' + badInput, 120, 350)
  text('Accuracy: ' + floor(optimalMoves / (optimalMoves + badInput) * 100) + '%', 120, 400)
}

function setExitSprite() {
  var elapsedTime = (millis() - startTime) / 1000
  var qTime = ceil(timer/4)
  if((floor(timer - elapsedTime) + 1) > timer-qTime) exitSprite = e[0]
  else if((floor(timer - elapsedTime) + 1) > timer-2*qTime) exitSprite = e[1]
  else if((floor(timer - elapsedTime) + 1) > timer-3*qTime) exitSprite = e[2]
  else exitSprite = e[3]
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
    if(key === 'w' && !maze.current.walls[0]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j-1)]
      if(dir) {
        if(step) sprite = r1
        else sprite = r2
      } else {
        if(step) sprite = l1
        else sprite = l2
      }
    } else if(key === 'd' && !maze.current.walls[1]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) + 1]
      if(step) sprite = r1
      else sprite = r2
      dir = true
      maze.current.highlight(sprite)
    } else if(key === 's' && !maze.current.walls[2]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j+1)]
      if(dir) {
        if(step) sprite = r1
        else sprite = r2
      } else {
        if(step) sprite = l1
        else sprite = l2
      }
    } else if(key === 'a' && !maze.current.walls[3]) {
      distance++
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) - 1]
      if(step) sprite = l1
      else sprite = l2
      dir = false
      maze.current.highlight(sprite)
    } else if(key === 'w' || key === 'a' || key === 's' || key === 'd') {
      badInput++
    }
    step = !step
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
