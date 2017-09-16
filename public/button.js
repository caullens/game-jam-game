function Button(position, dimensions, state, text, shownStates, imgsrc) {
  this.pos = {
    x: position.x,
    y: position.y
  }
  this.size = {
    width: dimensions.width,
    height: dimensions.height
  }
  this.state = state;
  if(imgsrc) {
    this.img = createImage(imgsrc);
  } else {
    this.text = text;
  }
  this.hidden = false;
  this.shownStates = shownStates;

  this.update = function(state) {
    if(this.shownStates.includes(state)) {
      this.hidden = false;
    }
    else this.hidden = true;
  }

  this.render = function() {
    if(this.img) image(this.img, this.pos.x, this.pos.y);
    else defaultButton(this);
  }

  this.isClicked = function(x, y) {
    return ((x > this.pos.x && x < this.pos.x + this.size.width) && (y > this.pos.y && y < this.pos.y + this.size.height))
  }

  createCanvas(600, 600)
}

function defaultButton(self) {
  color('black');
  rect(self.pos.x, self.pos.y, self.size.width, self.size.height);
  textAlign(CENTER);
  textFont('Verdana', 30);
  color('white');
  text(self.text, self.pos.x + self.size.width / 2, self.pos.y + 35);
}
