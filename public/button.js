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

  this.update = function(st) {
    if(this.shownStates.includes(st)) {
      this.hidden = false;
    }
    else this.hidden = true;
  }

  this.render = function() {
    if(!this.hidden) {
      if(this.img) image(this.img, this.pos.x, this.pos.y);
      else defaultButton(this);
    }
  }

  this.isClicked = function(x, y) {
    return ((x > this.pos.x && x < this.pos.x + this.size.width) && (y > this.pos.y && y < this.pos.y + this.size.height))
  }
}

function defaultButton(self) {
  fill('white');
  rect(self.pos.x, self.pos.y, self.size.width, self.size.height);
  textAlign(CENTER);
  textFont('Verdana', 30);
  fill('black');
  text(self.text, self.pos.x + self.size.width / 2, self.pos.y + 35);
}
