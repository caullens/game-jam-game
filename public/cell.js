// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Videos
// https://youtu.be/HyK_Q5rrcr4
// https://youtu.be/D8UgRyRnvXU
// https://youtu.be/8Ju_uxJ9v44
// https://youtu.be/_p5IH0L63wo

// Depth-first search
// Recursive backtracker
// https://en.wikipedia.org/wiki/Maze_generation_algorithm

function Cell(i, j, w, grid, cols, rows) {

  this.i = i;
  this.j = j;
  this.w = w;
  this.grid = grid;
  this.cols = cols;
  this.rows = rows;
  this.walls = [true, true, true, true];
  this.visited = false;

  this.checkNeighbors = function() {
    var neighbors = [];

    var top    = this.grid[this.index(i, j -1)];
    var right  = this.grid[this.index(i+1, j)];
    var bottom = this.grid[this.index(i, j+1)];
    var left   = this.grid[this.index(i-1, j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var r = floor(random(0, neighbors.length));
      return neighbors[r];
    } else {
      return undefined;
    }


  }
  this.highlight = function(character) {
    var x = this.i*this.w;
    var y = this.j*this.w;
    image(character, x, y, this.w, this.w)
  }

  this.show = function() {
    var x = this.i*this.w;
    var y = this.j*this.w;
    stroke(255);
    if (this.walls[0]) {
      line(x    , y    , x + this.w, y);
    }
    if (this.walls[1]) {
      line(x + this.w, y    , x + this.w, y + this.w);
    }
    if (this.walls[2]) {
      line(x + this.w, y + this.w, x    , y + this.w);
    }
    if (this.walls[3]) {
      line(x    , y + this.w, x    , y);
    }

    if (this.visited) {
      noStroke();
      fill(255, 0, 255, 100);
      rect(x, y, this.w, this.w);
    }
  }

  this.index = function(i, j) {
    if (i < 0 || j < 0 || i > this.cols-1 || j > this.rows-1) {
      return -1;
    }
    return i + j * this.cols;
  }
}
