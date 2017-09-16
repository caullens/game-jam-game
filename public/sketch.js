var state
var size
var columns
var step
var sprite
var dir
var timer
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
var e = []
var dirt
var cellTextures
var level

function setup() {
  //frameRate(5);
  state = 'menu'
  startSize = 150
  size = startSize
  level = 0

  tombStone = loadImage('/assets/TS.png')
  r1 = loadImage('/assets/R1.png')
  r2 = loadImage('/assets/R2.png')
  l1 = loadImage('/assets/L1.png')
  l2 = loadImage('/assets/L2.png')
  e.push(loadImage('/assets/E1.png'))
  e.push(loadImage('/assets/E2.png'))
  e.push(loadImage('/assets/E3.png'))
  e.push(loadImage('/assets/E4.png'))
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

  generateMaze()
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Medium", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hard", ['menu'])
  timer = 10
  createP().addClass('timer').style('display', 'none').position(650, 60)
}

function generateMaze() {
  level = level + 1
  maze = new Maze(size, cellTextures, level)
  maze.setup()
  columns = floor(width/size)
  startTime = millis()

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
  background(51)
  easyButton.update(state)
  mediumButton.update(state)
  hardButton.update(state)

  easyButton.render()
  mediumButton.render()
  hardButton.render()

  if(atExitTile() && state != 'draw-maze') {
    size = findNextDivisible(600, size)
    generateMaze()
    state = 'draw-maze'
  }

  if(state === 'menu') {
  } else if (state === 'draw-maze') {
    maze.draw();
    maze.current.highlight(tombStone)
    if(maze.current.i === 0 && maze.current.j === 0) {
      state = 'game'
      startTime = millis()
    }
    var para = select('.timer')
    para.show()
    para.html("Generating maze...")
  } else if (state === 'game') {
    maze.draw()
    maze.current.highlight(sprite)
    setExitSprite()
    maze.grid[exitX + exitY * columns].highlight(exitSprite)
    var elapsedTime = (millis() - startTime) / 1000
    if(elapsedTime >= timer) {
      size = startSize
      level = 0
      generateMaze()
      state = 'draw-maze'
    }
    var para = select('.timer')
    para.show()
    para.html("Time remaining: " + (floor(timer - elapsedTime) + 1))
  }
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
      timer += 2
      startTime = millis()
    }
    if(mediumButton.isClicked(mouseX, mouseY)) {
      state = mediumButton.state
      startTime = millis()
    }
    if(hardButton.isClicked(mouseX, mouseY)) {
      state = hardButton.state
      timer -= 2
      startTime = millis()
    }
  }
}

function keyTyped() {
  if(state === 'game') {
    if(key === 'w' && !maze.current.walls[0]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j-1)]
      if(dir) {
        if(step) sprite = r1
        else sprite = r2
      } else {
        if(step) sprite = l1
        else sprite = l2
      }
    } else if(key === 'd' && !maze.current.walls[1]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) + 1]
      if(step) sprite = r1
      else sprite = r2
      dir = true
      maze.current.highlight(sprite)
    } else if(key === 's' && !maze.current.walls[2]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j+1)]
      if(dir) {
        if(step) sprite = r1
        else sprite = r2
      } else {
        if(step) sprite = l1
        else sprite = l2
      }
    } else if(key === 'a' && !maze.current.walls[3]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) - 1]
      if(step) sprite = l1
      else sprite = l2
      dir = false
      maze.current.highlight(sprite)
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
