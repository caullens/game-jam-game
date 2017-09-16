var state
var size
var columns
var step
var sprite
var dir
var exitX
var exitY
var exitSprite

function setup() {
  //frameRate(5);
  state = 'menu'
  size = 150
  maze = new Maze(size)
  maze.setup()
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Medium", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hard", ['menu'])
  columns = floor(width/size)
  step = true
  dir = true
  sprite = loadImage('/assets/R1.png')
  exitX = Math.floor((Math.random() * columns))
  exitY = Math.floor((Math.random() * columns))
  exitSprite = loadImage('/assets/E1.png')
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
    size = findNextDivisible(width, size)
    maze.current = undefined
    maze = new Maze(size)
    maze.setup()
    columns = floor(width/size)
    exitX = Math.floor((Math.random() * columns))
    exitY = Math.floor((Math.random() * columns))
    state = 'draw-maze'
  }

  if(state === 'menu') {
  } else if (state === 'draw-maze') {
    maze.draw();
    if(maze.current.i === 0 && maze.current.j === 0) {
      state = 'game'
    }
  } else if (state === 'game') {
    maze.draw()
    maze.current.highlight(sprite)
    maze.grid[exitX + exitY * columns].highlight(exitSprite)
  }
}

function mouseClicked() {
  if(easyButton.isClicked(mouseX, mouseY)) state = easyButton.state
  if(mediumButton.isClicked(mouseX, mouseY)) state = mediumButton.state
  if(hardButton.isClicked(mouseX, mouseY)) state = hardButton.state
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

function atExitTile() {
  return (maze.current.i === exitX && maze.current.j === exitY)
}

function findNextDivisible(divisor, current) {
  while(current > 0 && divisor % --current != 0) {
    //do nothing
  }
  return current
}
