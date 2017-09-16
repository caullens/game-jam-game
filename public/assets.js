function Assets() {
  this.music = loadSound('/assets/ghouliet.wav')

  this.zombio = {
    counter: 0,
    direction: 'right',
    right: [loadImage('/assets/R1.png'), loadImage('/assets/R2.png')],
    left: [loadImage('/assets/L1.png'), loadImage('/assets/L2.png')]
  }

  this.ghouliet = {
    counter: 0,
    state: [
      loadImage('/assets/E1.png'),
      loadImage('/assets/E2.png'),
      loadImage('/assets/E3.png'),
      loadImage('/assets/E4.png')
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

  this.setGhoulietState = function(elapsedTime, timer) {
    var qTime = ceil(timer/4)
    if((floor(timer-elapsedTime)+1) > timer-qTime) this.ghouliet.counter = 0
    else if((floor(timer-elapsedTime)+1) > timer-2*qTime) this.ghouliet.counter = 1
    else if((floor(timer-elapsedTime)+1) > timer-3*qTime) this.ghouliet.counter = 2
    else this.ghouliet.counter = 3
  }

  this.getZombio = function() {
    if(this.zombio.direction === 'left') return this.zombio.left[this.zombio.counter]
    else return this.zombio.right[this.zombio.counter]
  }

  this.getGhouliet = function() {
    return this.ghouliet.state[this.ghouliet.counter]
  }
}
