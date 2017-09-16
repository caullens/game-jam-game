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
  this.exitX = 0
  this.exitY = 0

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
    this.exitX = Math.floor((Math.random() * this.columns))
    this.exitY = Math.floor((Math.random() * this.columns))
    while(dist(
        this.maze.current.i * this.maze.current.w, this.maze.current.j * this.maze.current.w,
        this.exitX * this.maze.current.w, this.exitY * this.maze.current.w) < 200) {
      this.exitX = Math.floor((Math.random() * this.columns))
      this.exitY = Math.floor((Math.random() * this.columns))
    }
    assets.resetGhoulietCounter()
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
      search = new Search(this.maze)
      var depth = search.findExit(this.exitX, this.exitY)
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
    this.maze.grid[this.exitX + this.exitY * this.columns].highlight(assets.getGhouliet())
    if(frameCount%4 === 0) assets.titleStepGhouliet()
    if(frameCount%60 === 0 && Math.random() > 0.7) assets.playRandomMoan()

    var elapsedTime = (millis()-this.startTime)/1000
    var para = select('.timer')
    var levelP = select('.level')
    var diff = select('.diff')
    para.html((floor(this.timer - elapsedTime) + 1) + ' seconds remaining')
    levelP.html("Level: " + this.level)

    stroke('black')
    fill('white')
    textFont('Freckle Face', 30)
    text(para.html(), 300, 25)
    textFont('Freckle Face', 15)
    text(levelP.html(), 50, 580)
    text(diff.html(), 500, 580)
  }

  this.moveRight = function() {
    this.distance++
    this.maze.current = this.maze.grid[this.maze.current.i + this.columns*(this.maze.current.j) + 1]
    this.maze.current.highlight(assets.getZombeo())
  }

  this.moveUp = function() {
    this.distance++
    this.maze.current = this.maze.grid[this.maze.current.i + this.columns*(this.maze.current.j-1)]
  }

  this.moveDown = function() {
    this.distance++
    this.maze.current = this.maze.grid[this.maze.current.i + this.columns*(this.maze.current.j+1)]
  }

  this.moveLeft = function() {
    this.distance++
    this.maze.current = this.maze.grid[this.maze.current.i + this.columns*(this.maze.current.j) - 1]
    this.maze.current.highlight(assets.getZombeo())
  }

  this.atExitTile = function() {
    return (this.maze.current.i === this.exitX && this.maze.current.j === this.exitY)
  }

  this.findNextDivisible = function(divisor, current) {
    while(current > 0 && divisor % --current != 0) {
      //do nothing
    }
    return current
  }
}
