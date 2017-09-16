function Assets() {
  this.music = loadSound('/assets/ghouliet.wav')

  this.moans = [
    loadSound('/assets/moan1.wav'),
    loadSound('/assets/moan2.wav')
  ]

  this.zombeo = {
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
    ],
    endAnimation: [
      loadImage('/assets/E1.png'),
      loadImage('/assets/E2.png'),
      loadImage('/assets/E3.png'),
      loadImage('/assets/E4.png'),
      loadImage('/assets/E5.png'),
      loadImage('/assets/E6.png'),
      loadImage('/assets/E7.png'),
      loadImage('/assets/E8.png'),
      loadImage('/assets/E9.png'),
      loadImage('/assets/E10.png'),
      loadImage('/assets/E11.png'),
      loadImage('/assets/E12.png')
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

  this.resetZombeoCounter = function() {
    this.zombeo.counter = 0
  }

  this.stepZombeo = function(key) {
    if(key === 'a') this.zombeo.direction = 'left'
    else if(key === 'd') this.zombeo.direction = 'right'
    if(this.zombeo.counter === 0) this.zombeo.counter = 1
    else this.zombeo.counter = 0
  }

  this.titleStepGhouliet = function() {
    if(this.ghouliet.counter < 11) this.ghouliet.counter += 1
  }

  this.titleStepZombeo = function() {
    this.zombeo.counter += 1
    if(this.zombeo.counter >= 10) {
      this.resetZombeoCounter()
    }
  }

  this.getZombeo = function() {
    if(this.zombeo.direction === 'left') return this.zombeo.left[this.zombeo.counter]
    else return this.zombeo.right[this.zombeo.counter]
  }

  this.getGhouliet = function() {
    return this.ghouliet.titleAnimation[this.ghouliet.counter]
  }

  this.playRandomMoan = function() {
    var moan = this.moans[Math.floor(Math.random() * 2)]
    moan.setVolume(0.2)
    moan.play()
  }

  this.endStepZombeo = function() {
    if(this.zombeo.counter < 11) this.zombeo.counter += 1
  }
}
