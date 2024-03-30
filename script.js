let scrollPos = 0;
let n = 100;
let onMobile = false;
let startX, startY;
let bits = [];
let bubbles = [];
let c1;
let xs = [];
let lines = 0;
let orbit1 = 20;
function setup() {
  c1 = max(400, 0.97 * min(windowWidth, windowHeight));
  createCanvas(c1, c1);
  textFont("Courier New");
  startC = random(0, 255);
  orbit1 = random(20, 40);
  nOrbit = int(random(10, 25));
  onMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
  textSize(20);
  textAlign(CENTER, CENTER);
  // angleMode(DEGREES);
  for (let i = 0; i < c1; i++) {
    bits[i] = { x: 0, y: -c1 / 2 + i };
  }
  strokeWeight(3);
  for (let i = 0; i < 100; i++) {
    bubbles[i] = {
      x: random(-c1 / 2, c1 / 2),
      y: random(0, c1),
      color: [
        random(200, 255),
        random(200, 255),
        random(230, 255),
        random(2, 20)
      ],
      size: random(5, 20),
      m: random(5, 20)
    };
  }
  for (let i = 0; i < 5; i++) {
    xs[i] = {
      x: random(-width / 1.9, width / 1.9),
      w: random(width / 8, width / 5),
      w2: random(width / 15, width / 10),
      a: random(40, 50),
      a2: random(40, 50),
      b: random(4, 9),
      c: random(2, 10),
      d: random(3, 11),
      e: random(5, 14)
    };
  }
}

function draw() {
  translate(c1 / 2, c1 / 2);
  keyCheck();
  p = color(
    150 + 100 * Math.sin((scrollPos / 31 + startC) / 60),
    180 + 100 * Math.sin((scrollPos / 23 + startC) / 60),
    190 + 100 * Math.sin((scrollPos / 51 + startC) / 60)
  );

  background(p);
  t = -frameCount / 10;
  scrollPos += 0.3;
  for (let j = 0; j < xs.length; j++) {
    for (let i = 0; i < bits.length; i += 3) {
      y = bits[i].y;
      x =
        xs[j].x +
        (width / xs[j].a) * Math.sin(scrollPos / 60) * Math.cos(scrollPos / 60) -
        (width / xs[j].e) * Math.sin((-scrollPos / xs[j].c + y / xs[j].e) / 60);
      y1 = bits[i].y;
      x1 =
        xs[j].x +
        xs[j].w +
        (width / xs[j].a2) * Math.sin((-scrollPos + y / xs[j].b) / 60) * Math.cos((scrollPos) / 60) -
        xs[j].w2 * Math.sin((-scrollPos / xs[j].d + y / xs[j].b) / 60);
      stroke(
        50 + 50 * Math.sin((scrollPos + y) / xs[j].a2 / 60),
        80 + 50 * Math.sin((scrollPos + y) / (xs[j].b + xs[j].e) / 60),
        90 + 50 * Math.sin((scrollPos + y) / xs[j].a / 60),
        60
      );
      // circle(x,y,10)
      line(x, y, x1, y1);
      line(-x, -y, -x1, -y1);
      line(y, -x, y1, 2 * x1);
      line(y, -2 * x, y1, x1);
    }
  }
  fill(
    5 * Math.sin((scrollPos / 31 + startC) / 60),
    10 * Math.sin((scrollPos / 23 + startC) / 60),
    20 * Math.sin((scrollPos / 51 + startC) / 60),
    51
  );
  // noStroke()

  for (let i = 0; i < nOrbit; i++) {
    push();
    scale(2 / (1 + i), 2 / (1 + i));
    rotate((360 / nOrbit) * i);
    orbits();
    pop();
  }
  for (let i = 0; i < bubbles.length; i++) {
    x = bubbles[i].x + bubbles[i].m * 2 * Math.cos((t + scrollPos / bubbles[i].m) / 60);
    y =
      -height / 1.5 +
      ((bubbles[i].y + scrollPos / bubbles[i].m - (t * bubbles[i].m) / 5) %
        height) *
      2.5;
    fill(bubbles[i].color);

    noStroke();
    circle(x, y, bubbles[i].size);
    circle(-x, -y, bubbles[i].size);
  }
  portHole();
  push();
  q = 10000;
  lines = int(abs((infinity.length - 1) * (scrollPos / q)));
  op = (155 * abs((infinity.length - 1) * (scrollPos / q))) % 155;
  fill(255, 255, 255, op);
  stroke(255, 255, 255, 2);
  text(infinity[int(lines % infinity.length)], 0, height / 2.3);
  pop();
}
function orbits() {
  push();
  strokeWeight(0.5);
  col1 = color(200, 240, 255);
  col1.setAlpha(50);
  fill(col1);
  x = (c1 / 2) * Math.sin(scrollPos / 10 / 60) * Math.cos(scrollPos / 60);
  y = (c1 / 2) * Math.sin(scrollPos / 10 / 60) * Math.sin(scrollPos / 60);
  circle(x, y, 10);
  circle(
    x + (c1 / orbit1) * Math.sin(scrollPos / 60),
    y + (c1 / orbit1) * Math.cos(scrollPos / 60),
    5
  );
  noFill();
  stroke(col1);
  circle(x, y, (c1 / orbit1) * 2);
  x = (c1 / 2) * Math.sin(scrollPos / 10 / 60 + PI) * cos(scrollPos / 60);
  y = (c1 / 2) * Math.sin(scrollPos / 10 / 60 + PI) * sin(scrollPos / 60);
  fill(col1);
  circle(x, y, 10);
  circle(
    x + (c1 / orbit1) * Math.sin(scrollPos / 60 + PI),
    y + (c1 / orbit1) * Math.cos(scrollPos / 60 + PI),
    5
  );
  noFill();
  stroke(col1);
  circle(x, y, (c1 / orbit1) * 2);
  circle(0, 0, c1 * Math.sin(scrollPos / 10 / 60));
  pop();
}
function keyCheck() {
  if (keyIsPressed && keyCode === 38) {
    scrollPos--;
  }
  if (keyIsPressed && keyCode === 40) {
    scrollPos++;
  }
}
function windowResized() {
  setup();
  draw();
}

function mouseWheel(event) {
  scrollPos += event.delta / 5;
  return false;
}
function keyPressed() {
  if (keyCode === 32) {
    setup();
    draw();
  }
}
function touchStarted() {
  if (onMobile) {
    if (touches.length > 0) {
      startX = touches[0].x;
      startY = touches[0].y;
    }
    return false; // Prevent default browser behavior
  }
}

function touchMoved() {
  if (onMobile) {
    if (touches.length > 0) {
      endX = touches[0].x;
      endY = touches[0].y;
    } else {
      endX = mouseX;
      endY = mouseY;
    }

    const diffX = endX - startX;
    const diffY = endY - startY;
    scrollPos += diffY / 50;
    // touches = []
  }
}
function portHole() {
  p.setAlpha(120);
  fill(p);
  noStroke();
  rd = c1 / 2.5;
  beginShape();
  for (let i = 0; i <= PI; i += PI / 100) {
    x = rd * Math.cos(i);
    y = rd * Math.sin(i);
    vertex(x, y);
  }
  vertex(-c1, 0);
  vertex(-c1, c1);
  vertex(c1, c1);
  vertex(c1, 0);
  endShape(CLOSE);
  noStroke()
  beginShape();
  for (let i = PI; i <= TWO_PI; i += PI / 100) {
    x = rd * Math.cos(i);
    y = rd * Math.sin(i);
    vertex(x, y);
  }
  vertex(c1, 0);
  vertex(c1, -c1);
  vertex(-c1, -c1);
  vertex(-c1, 0);
  endShape(CLOSE);

  noFill();
  circle(0, 0, 2 * rd + 50);
}
//a poem that can be read forward, and backward and in a loop
infinity = [
  "breathe in",
  "deeply",
  "breathe out",
  "fully",
  "take a moment and notice",
  "for there were breaths before",
  "breaths at a beginning",
  "generations",
  "the wind's breath",
  "the ocean's breath",
  "an ebb and flow",
  "zoom out or in",
  "to see more",
  "of atoms",
  "of stars",
  "of existence",
  "breathe in as a tide pulls",
  "breathe out as a star expands",
  "breathe in finite moments",
  "breathe out finite time",
  "into the infinite ",
  "and then "
];