function Search(maze) {
  this.findExit = function(exitX, exitY) {
    var depth = 0
    var queue = [{tile: maze.current, from: 'left'}]
    do {
      var next = queue.shift()
      if(next.from !== 'top' && !next.tile.walls[0]) {
        queue.push({
          tile: maze.grid[maze.index(next.tile.i, next.tile.j-1)],
          from: 'bottom'
        })
      }
      if(next.from !== 'right' && !next.tile.walls[1]) {
        queue.push({
          tile: maze.grid[maze.index(next.tile.i+1, next.tile.j)],
          from: 'left'
        })
      }
      if(next.from !== 'bottom' && !next.tile.walls[2]) {
        queue.push({
          tile: maze.grid[maze.index(next.tile.i, next.tile.j+1)],
          from: 'top'
        })
      }
      if(next.from !== 'left' && !next.tile.walls[3]) {
        queue.push({
          tile: maze.grid[maze.index(next.tile.i-1, next.tile.j)],
          from: 'right'
        })
      }
      depth = depth +1
    } while(!(next.tile.i === exitX && next.tile.j === exitY))
    return depth
  }
}
