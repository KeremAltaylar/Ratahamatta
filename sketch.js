var inc = fxrandRange(2, 30, 0.1);
var scl = fxrandRange(25, 40, 1);
var magv = fxrandRange(2, 7, 0.1);
var cols, rows;
var fr;
var zoff = 0;
var particles = [];
var particles2 = [];
var particles3 = [];
var flowfield;
var magv;
var cr = fxrandRange(120, 170, 1);
var cg = fxrandRange(10, 180, 1);
var cb = fxrandRange(30, 200, 1);
var dr = fxrandRange(24, 200, 1);
var dg = fxrandRange(15, 200, 1);
var db = fxrandRange(12, 180, 1);
var indexk = 0;
var sw1 = fxrandRange(0.1, 0.4, 0.1);
var sw2 = fxrandRange(0.1, 0.2, 0.1);
var mes1a = fxrandRange(0.1, 4, 0.1);
var mes2a = fxrandRange(0.1, 8, 0.1);
var mes1b = fxrandRange(2, 4, 0.1);
var mes2b = fxrandRangex(2, 4, 0.1);

function setup() {
  createCanvas(windowWidth, windowHeight);

  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  fr = createP("");
  flowfield = new Array(rows * cols);
  for (i = 0; i < 100; i++) {
    particles[i] = new Particle(
      cr,
      100,
      0,
      fxrand() * (windowWidth / 2) + windowWidth / 4,
      fxrand() * (windowHeight / 2) + windowHeight / 4,
      sw1,
      2
    );
  }
  let p3Count = 140;
  if (windowWidth > windowHeight) {
    p3Count += floor((windowWidth - windowHeight) * 0.5);
  }
  for (i = 0; i < p3Count; i++) {
    let px, py;
    do {
      px = fxrand() * windowWidth;
      py = fxrand() * windowHeight;
    } while (
      px > windowWidth * 0.45 &&
      px < windowWidth * 0.55 &&
      py > windowHeight * 0.45 &&
      py < windowHeight * 0.55
    );
    particles3[i] = new Particle(
      80,
      70,
      0,
      px,
      py,
      0.3,
      3
    );
  }

  for (i = 0; i < 100; i++) {
    particles2[i] = new Particle2(
      70,
      70,
      70,
      fxrand() * windowWidth,
      fxrand() * (windowHeight / 2),
      sw2,
      3
    );
  }
  // background(235, 215, 141);
  background(0);
}

function draw() {
  if (indexk > 300) {
    noLoop();
  }
  var yoff = 0;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      var index = x + y * rows;
      flowfield[index] = v;
      var angle = zoff * xoff;
      var v = p5.Vector.fromAngle(angle);
      v.setMag(magv);
      xoff += inc;

      //rect(scl * x, scl * y, scl, scl);
    }
    yoff += inc;
    zoff += 0.3;
  }
  for (var i = 0; i < particles.length; i++) {
    particles[i].follow(flowfield);
    particles[i].update();
    particles[i].edges();
    particles[i].show();
  }
  for (var i = 0; i < particles2.length; i++) {
    particles2[i].follow(flowfield);
    particles2[i].update();
    particles2[i].edges();
    particles2[i].show();
  }
  for (var i = 0; i < particles3.length; i++) {
    particles3[i].follow(flowfield);
    particles3[i].update();
    particles3[i].edges();
    particles3[i].show();
  }
  push();
  rectMode(RADIUS);
  fill(0, 1 * sin(millis() * 1));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
  // stroke(0, 130);
  // push();
  // translate(x * scl, y * scl);
  // rotate(v.heading());
  // strokeWeight(0.1);
  // line(0, 0, scl, 0);
  // pop(); //fill(r);
  indexk = indexk + 1;
  //console.log(indexk);
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  indexk = 0;
  cols = floor(windowWidth / scl);
  rows = floor(windowHeight / scl);
  //fr = createP("");
  flowfield = new Array(cols * rows);

  for (i = 0; i < 100; i++) {
    particles[i] = new Particle(
      cr,
      100,
      0,
      fxrand() * (windowWidth / 2) + windowWidth / 4,
      fxrand() * (windowHeight / 2) + windowHeight / 4,
      sw1,
      2
    );
  }
  let p3Count = 140;
  if (windowWidth > windowHeight) {
    p3Count += floor((windowWidth - windowHeight) * 0.5);
  }
  for (i = 0; i < p3Count; i++) {
    let px, py;
    do {
      px = fxrand() * windowWidth;
      py = fxrand() * windowHeight;
    } while (
      px > windowWidth * 0.45 &&
      px < windowWidth * 0.55 &&
      py > windowHeight * 0.45 &&
      py < windowHeight * 0.55
    );
    particles3[i] = new Particle(
      80,
      70,
      0,
      px,
      py,
      0.3,
      3
    );
  }

  for (i = 0; i < 100; i++) {
    particles2[i] = new Particle2(
      70,
      70,
      70,
      fxrand() * windowWidth,
      fxrand() * (windowHeight / 2),
      sw2,
      3
    );
  }
  push();
  noStroke();
  background(0);
  rectMode(RADIUS);
  fill(0);
  //fill(alpha(50));
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );

  rectMode(RADIUS);
  fill(0, 1 * sin(millis() * 1));
  noStroke();
  rect(
    windowWidth / 2,
    windowHeight / 2,
    windowWidth / 2 - 30,
    windowHeight / 2 - 30
  );
  pop();
  loop();
}

function fxrandRange(min, max, step) {
  value = Math.round((fxrand() * (max - min)) / step);
  return value * step + min;
}

function mousePressed() {
  indexk = 0;
  zoff = 0;
  particles = [];
  particles2 = [];

  for (var i = 0; i < 100; i++) {
    particles[i] = new Particle(
      cr,
      100,
      0,
      fxrand() * (windowWidth / 2) + windowWidth / 4,
      fxrand() * (windowHeight / 2) + windowHeight / 4,
      sw1,
      2
    );
  }

  for (var i = 0; i < 100; i++) {
    particles2[i] = new Particle2(
      70,
      70,
      70,
      fxrand() * windowWidth,
      fxrand() * (windowHeight / 2),
      sw2,
      3
    );
  }

  let p3Count = 140;
  if (windowWidth > windowHeight) {
    p3Count += floor((windowWidth - windowHeight) * 0.5);
  }
  for (var i = 0; i < p3Count; i++) {
    let px, py;
    do {
      px = fxrand() * windowWidth;
      py = fxrand() * windowHeight;
    } while (
      px > windowWidth * 0.45 &&
      px < windowWidth * 0.55 &&
      py > windowHeight * 0.45 &&
      py < windowHeight * 0.55
    );
    particles3[i] = new Particle(
      80,
      70,
      0,
      px,
      py,
      0.3,
      3
    );
  }
  background(0);
  loop();
}

window.$fxhashFeatures = {
  Woods: cr,
  Dark: db,
  Light: magv,
  Guardian: inc,
  Feral: scl,
};
