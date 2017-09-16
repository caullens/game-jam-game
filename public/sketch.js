var state
var size
var columns
var step
var sprite
var dir
var timer
var startTime
var startSize

function setup() {
  //frameRate(5);
  state = 'menu'
  startSize = 150
  size = startSize
  maze = new Maze(size)
  maze.setup()
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Medium", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hard", ['menu'])
  columns = floor(width/size)
  step = true
  dir = true
  sprite = loadImage('/assets/R1.png')
  timer = 10
  createP().addClass('timer')
}

function draw() {
  background(51)
  easyButton.update(state)
  mediumButton.update(state)
  hardButton.update(state)

  easyButton.render()
  mediumButton.render()
  hardButton.render()

  if(checkCurrent() && state != 'draw-maze') {
    size = findNextDivisible(width, size)
    maze = new Maze(size)
    maze.setup()
    columns = floor(width/size)
    state = 'draw-maze'
  }

  if(state === 'menu') {
  } else if (state === 'draw-maze') {
    maze.draw();
    if(maze.current.i === 0 && maze.current.j === 0) {
      state = 'game'
      startTime = millis()
    }
  } else if (state === 'game') {
    maze.draw()
    maze.current.highlight(sprite)
    var elapsedTime = (millis() - startTime) / 1000
    if(elapsedTime >= timer) {
      size = startSize
      maze = new Maze(size)
      maze.setup()
      columns = floor(width/size)
      state = 'draw-maze'
      startTime = millis()
    }
    var para = select('.timer')
    para.value(floor(timer - elapsedTime) + 1)
  }
}

function mouseClicked() {
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

function keyTyped() {
  if(state === 'game') {
    if(key === 'w' && !maze.current.walls[0]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j-1)]
      if(dir) {
        if(step) sprite = loadImage('/assets/R1.png')
        else sprite = loadImage('assets/R2.png')
      } else {
        if(step) sprite = loadImage('/assets/L1.png')
        else sprite = loadImage('assets/L2.png')
      }
    } else if(key === 'd' && !maze.current.walls[1]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) + 1]
      if(step) sprite = loadImage('/assets/R1.png')
      else sprite = loadImage('assets/R2.png')
      dir = true
      maze.current.highlight(sprite)
    } else if(key === 's' && !maze.current.walls[2]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j+1)]
      if(dir) {
        if(step) sprite = loadImage('/assets/R1.png')
        else sprite = loadImage('assets/R2.png')
      } else {
        if(step) sprite = loadImage('/assets/L1.png')
        else sprite = loadImage('assets/L2.png')
      }
    } else if(key === 'a' && !maze.current.walls[3]) {
      maze.current = maze.grid[maze.current.i + columns*(maze.current.j) - 1]
      if(step) sprite = loadImage('/assets/L1.png')
      else sprite = loadImage('assets/L2.png')
      dir = false
      maze.current.highlight(sprite)
    }
    step = !step
  }
}

function checkCurrent() {
  return maze.current === maze.grid[maze.grid.length - 1]
}

function findNextDivisible(divisor, current) {
  while(current > 0 && divisor % --current != 0) {
    //do nothing
  }
  return current
}
