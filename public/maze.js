// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Editted by Caullen Sasnett and David Freeman

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

function Maze(size, dirt) {

  var cols, rows;
  var w = size;
  this.grid = [];

  this.current;

  var stack = [];

  this.setup = function() {
    createCanvas(600,600)
    cols = floor(width/w);
    rows = floor(height/w);

    for (var   j = 0; j < rows; j++) {
      for (var i = 0; i < cols; i++) {
        var cell = new Cell(i, j, w, this.grid, cols, rows, dirt);
        this.grid.push(cell);
      }
    }
    this.current = this.grid[0];
  }

  this.draw = function() {
    background(51);
    for (var i = 0; i < this.grid.length; i++) {
      this.grid[i].show();
    }

    this.current.visited = true;
    //this.current.highlight();
    // STEP 1
    var next = this.current.checkNeighbors();
    if (next) {
      next.visited = true;

      // STEP 2
      stack.push(this.current);

      // STEP 3
      this.removeWalls(this.current, next);

      // STEP 4
      this.current = next;
    } else if (stack.length > 0) {
      this.current = stack.pop();
    }

  }

  this.index = function(i, j) {
    if (i < 0 || j < 0 || i > cols-1 || j > rows-1) {
      return -1;
    }
    return i + j * cols;
  }


  this.removeWalls = function(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
      a.walls[3] = false;
      b.walls[1] = false;
    } else if (x === -1) {
      a.walls[1] = false;
      b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
      a.walls[0] = false;
      b.walls[2] = false;
    } else if (y === -1) {
      a.walls[2] = false;
      b.walls[0] = false;
    }
  }
}
