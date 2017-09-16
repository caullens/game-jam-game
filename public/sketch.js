var state

function setup() {
  //frameRate(5);
  state = 'menu'
  maze = new Maze(200)
  maze.setup()
  createCanvas(600, 600);
  easyButton = new Button({x: 10, y: 550}, {width: 150, height: 40}, 'game', "Easy", ['menu'])
  mediumButton = new Button({x: 225, y: 550}, {width: 150, height: 40}, 'game', "Medium", ['menu'])
  hardButton = new Button({x: 440, y: 550}, {width: 150, height: 40}, 'game', "Hard", ['menu'])
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
  } else if (state === 'game') {
    maze.draw();
  }
}

function mouseClicked() {
  console.log("Mouse clicked")
  if(easyButton.isClicked(mouseX, mouseY)) state = easyButton.state
  if(mediumButton.isClicked(mouseX, mouseY)) state = mediumButton.state
  if(hardButton.isClicked(mouseX, mouseY)) state = hardButton.state
}
