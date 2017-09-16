var state

function setup() {
  //frameRate(5);
  state = 'menu'
  maze = new Maze(100)
  maze.setup()
  createCanvas(600, 600);
}

function draw() {
  if(state === 'menu') {
    background(51)
    color('black');
    rect(250, 500, 100, 40);
    textAlign(CENTER);
    textFont('Verdana', 30);
    color('white');
    text("Start", 300, 535);
  } else if (state === 'game') {
    maze.draw();
  }
}

function mouseClicked() {
  if((mouseX > 250 && mouseX < 350) && (mouseY > 500 && mouseY < 540)) state = "game";
}
