function Game() {
  this.state = 'menu'
  this.startSize = 150
  this.level = 0
  this.totalTime = 0
  this.badInput = 0
  this.depth = 0
  this.optimalMoves = 0
  this.distance = 0
  this.columns = 0
  this.startTime = 0
  this.step = true
  this.dir = true
  this.size = this.startSize
  this.easy = false
  this.med = true
  this.hard = false
  this.optimalMoves = 0

  this.maze = new Maze(this.size, assets.cellTextures, this.level)

  this.exit = {
    x: 0,
    y: 0
  }

  this.startingPosition = {
    x: 0,
    y: 0
  }

  this.direction = undefined
  this.jumpBuffer = 0

  this.newGame = function() {
    this.level = 0
    this.totalTime = 0
    this.badInput = 0
    this.depth = 0
    this.optimalMoves = 0
    this.distance = 0
    this.generateMaze()
  }

  this.generateMaze = function() {
    this.level = this.level + 1
    this.maze = new Maze(this.size, assets.cellTextures, this.level)
    this.maze.setup()
    this.columns = floor(width/this.size)
    this.startTime = millis()
    this.depth = 0

    this.step = true
    this.dir = true
    assets.resetZombeoCounter()
    assets.resetGhoulietCounter()
  }

  this.findRandomStartAndEnd = function() {
    do {
      this.exit.x = Math.floor((Math.random() * this.columns))
      this.exit.y = Math.floor((Math.random() * this.columns))
    } while(!this.maze.grid[this.maze.index(this.exit.x, this.exit.y)].walls[2])

    do {
      this.startingPosition.x = Math.floor((Math.random() * this.columns))
      this.startingPosition.y = Math.floor((Math.random() * this.columns))
    } while(
      !this.maze.grid[this.maze.index(this.startingPosition.x, this.startingPosition.y)].walls[2]
      || this.startingPosition.x == this.exit.x
      || this.startingPosition.y == this.exit.y
    )
  }

  this.checkForGameOver = function() {
    var elapsedTime = (millis()-this.startTime)/1000
    if(this.state !== 'draw-maze' && this.state !== 'menu' && elapsedTime>=this.timer) {
      if(this.state !== 'summary') this.totalTime += elapsedTime
      this.state = 'summary'
    }
  }

  this.checkForLevelCompleted = function() {
    var elapsedTime = (millis()-this.startTime)/1000
    if(this.atExitTile() && this.state !== 'draw-maze') {
      this.size = this.findNextDivisible(600, this.size)
      this.totalTime += elapsedTime
      this.generateMaze()
      this.state = 'draw-maze'
    }
  }

  this.drawMaze = function() {
    assets.resetZombeoCounter()
    assets.resetGhoulietCounter()
    this.maze.draw()
    this.maze.current.highlight(assets.tombStone)
    if(this.maze.current.i === 0 && this.maze.current.j === 0) {
      this.findRandomStartAndEnd()
      this.maze.current = this.maze.grid[this.maze.index(this.startingPosition.x, this.startingPosition.y)]
      search = new Search(this.maze)
      var depth = search.findExit(this.exit.x, this.exit.y)
      this.optimalMoves += depth
      this.timer = floor(depth/this.level)
      if(this.easy) this.timer = ceil(this.timer * 1.5)
      else if(this.hard) this.timer = ceil(this.timer * 0.5)
      this.state = 'game'
      this.startTime = millis()
    }

    var para = select('.timer')
    var levelP = select('.level')
    var diff = select('.diff')
    para.html("Generating maze...")
    levelP.html("Level: " + this.level)
    if(this.easy) diff.html('Difficulty: Easy')
    else if(this.med) diff.html('Difficulty: Normal')
    else diff.html('Difficulty: Hardcore')
  }

  this.play = function() {
    this.maze.draw()
    this.maze.current.highlight(assets.getZombeo())
    this.maze.grid[this.maze.index(this.exit.x, this.exit.y)].highlight(assets.getGhouliet())
    if(frameCount%4 === 0) assets.titleStepGhouliet()
    if(frameCount%60 === 0 && Math.random() > 0.7) assets.playRandomMoan()
    if(this.jumpBuffer === 0) this.applyGravity()
    else this.jumpBuffer -= 1
    if(frameCount%4 === 0) this.move()

    var elapsedTime = (millis()-this.startTime)/1000
    var para = select('.timer')
    var levelP = select('.level')
    var diff = select('.diff')
    para.html((floor(this.timer - elapsedTime) + 1) + ' seconds remaining')
    levelP.html("Level: " + this.level)

    textAlign(CENTER, CENTER)
    stroke('black')
    fill('white')
    textFont('Freckle Face', 30)
    text(para.html(), 300, 25)
    textFont('Freckle Face', 15)
    text(levelP.html(), 50, 580)
    text(diff.html(), 500, 580)
  }

  this.move = function() {
    if(this.direction && this.direction === 'right') this.moveRight()
    if(this.direction && this.direction === 'left') this.moveLeft()
  }

  this.moveRight = function() {
    this.distance++
    if(!this.maze.current.walls[1]) this.maze.current = this.maze.grid[this.maze.index(this.maze.current.i, this.maze.current.j) + 1]
    this.maze.current.highlight(assets.getZombeo())
  }

  this.jump = function() {
    this.distance++
    this.jumpBuffer = 10
    if(!this.maze.current.walls[0]) this.maze.current = this.maze.grid[this.maze.index(this.maze.current.i,this.maze.current.j-1)]
  }

  this.moveLeft = function() {
    this.distance++
    if(!this.maze.current.walls[3]) this.maze.current = this.maze.grid[this.maze.index(this.maze.current.i, this.maze.current.j) - 1]
    this.maze.current.highlight(assets.getZombeo())
  }

  this.setMoveDirection = function(direc) {
    this.direction = direc
  }

  this.stopMoving = function(direc) {
    if(this.direction === direc) this.direction = undefined
  }

  this.applyGravity = function() {
    if(!this.maze.current.walls[2]) this.moveDown()
  }

  this.atExitTile = function() {
    return (this.maze.current.i === this.exit.x && this.maze.current.j === this.exit.y)
  }

  this.findNextDivisible = function(divisor, current) {
    while(current > 0 && divisor % --current != 0) {
      //do nothing
    }
    return current
  }
}
