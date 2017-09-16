function Assets() {
  this.music = loadSound('/assets/ghouliet.wav')

  this.zombio = {
    counter: 0,
    direction: 'right',
    right: [loadImage('/assets/R1.png'), loadImage('/assets/R2.png')],
    left: [loadImage('/assets/L1.png'), loadImage('/assets/L2.png')],
    titleAnimation: [
      loadImage('/assets/W1.png'),
      loadImage('/assets/W2.png'),
      loadImage('/assets/W3.png'),
      loadImage('/assets/W4.png'),
      loadImage('/assets/W5.png'),
      loadImage('/assets/W6.png'),
      loadImage('/assets/W7.png'),
      loadImage('/assets/W8.png'),
      loadImage('/assets/W9.png'),
      loadImage('/assets/W10.png'),
    ]
  }

  this.ghouliet = {
    counter: 0,
    titleAnimation: [
      loadImage('/assets/D1.png'),
      loadImage('/assets/D2.png'),
      loadImage('/assets/D3.png'),
      loadImage('/assets/D4.png'),
      loadImage('/assets/D5.png'),
      loadImage('/assets/D6.png'),
      loadImage('/assets/D7.png'),
      loadImage('/assets/D8.png'),
      loadImage('/assets/D9.png'),
      loadImage('/assets/D10.png'),
      loadImage('/assets/D11.png'),
      loadImage('/assets/D12.png'),
    ]
  }

  this.tombStone = loadImage('/assets/TS.png')

  this.cellTextures = {
    dirt : [
    loadImage('/assets/dirt1.png'),
    loadImage('/assets/dirt2.png'),
    loadImage('/assets/dirt3.png'),
    loadImage('/assets/dirt4.png')
    ],
    walls : [
      loadImage('/assets/wallh.png'),
      loadImage('/assets/wallv.png')
    ]
  }

  this.ground = {
    top: loadImage('/assets/groundT.png'),
    bottom: loadImage('/assets/groundB.png')
  }

  this.resetGhoulietCounter = function() {
    this.ghouliet.counter = 0
  }

  this.resetZombioCounter = function() {
    this.zombio.counter = 0
  }

  this.stepZombio = function(key) {
    if(key === 'a') this.zombio.direction = 'left'
    else if(key === 'd') this.zombio.direction = 'right'
    if(this.zombio.counter === 0) this.zombio.counter = 1
    else this.zombio.counter = 0
  }

  this.titleStepGhouliet = function() {
    if(this.ghouliet.counter < 11) this.ghouliet.counter += 1
  }

  this.titleStepZombio = function() {
    this.zombio.counter += 1
    if(this.zombio.counter >= 10) {
      this.resetZombioCounter()
    }
  }

  this.getZombio = function() {
    if(this.zombio.direction === 'left') return this.zombio.left[this.zombio.counter]
    else return this.zombio.right[this.zombio.counter]
  }

  this.getGhouliet = function() {
    return this.ghouliet.titleAnimation[this.ghouliet.counter]
  }
}
