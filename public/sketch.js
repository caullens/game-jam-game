var state
var size
var columns

function setup() {
  //frameRate(5);
  state = 'menu'
  size = 50
  maze = new Maze(size)
  maze.setup()
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'draw-maze', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'draw-maze', "Medium", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'draw-maze', "Hard", ['menu'])
  columns = floor(width/size)
}

function draw() {
  background(51)
  easyButton.update(state)
  mediumButton.update(state)
  hardButton.update(state)

  easyButton.render()
  mediumButton.render()
  hardButton.render()

  if(state === 'menu') {
  } else if (state === 'draw-maze') {
    maze.draw();
    if(maze.current.i === 0 && maze.current.j === 0) {
      state = 'game'
    }
  } else if (state === 'game') {
    maze.draw()

  }
}

function mouseClicked() {
  if(easyButton.isClicked(mouseX, mouseY)) state = easyButton.state
  if(mediumButton.isClicked(mouseX, mouseY)) state = mediumButton.state
  if(hardButton.isClicked(mouseX, mouseY)) state = hardButton.state
}

function keyTyped() {
  if(state === 'game') {
    if(key === 'w') {
      if(!maze.current.walls[0]) maze.current = maze.grid[maze.current.i + columns*(maze.current.j-1)]
    } else if(key === 'd') {
      if(!maze.current.walls[1]) maze.current = maze.grid[maze.current.i + columns*(maze.current.j) + 1]
    } else if(key === 's') {
      if(!maze.current.walls[2]) maze.current = maze.grid[maze.current.i + columns*(maze.current.j+1)]
    } else if(key === 'a') {
      if(!maze.current.walls[3]) maze.current = maze.grid[maze.current.i + columns*(maze.current.j) - 1]
    }
  }
}
