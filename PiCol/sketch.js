var box1, box2;
var timestep = 100000;
var p;
var prec = 1000000;

function setup() {
  createCanvas(600, 600);
  slider = createSlider(1, 6, 1);
  slider.position(400, 0);
  slider.style('width', '150px');
  // p = createP("Precision: " + slider.value());
  // p.style('color', 'black');
  // p.position(400, 10);
  button = createButton('Run');
  button.position(400, 50);
  button.mousePressed(mainsetup);
  mainsetup();
}

function mainsetup() {
  prec = Math.pow(10, slider.value());
  timestep = prec/10;
  box1 = new Box(100, 50, 50, 1);
  box2 = new Box(300, 200, 200, prec * prec);
  box2.vel = createVector(-1, 0);
}

function draw() {
  background(255);
  textSize(20);
  text("Precision: " + slider.value(), 400, 40)
  // p.value("Precision: " + slider.value())
  fill(255, 0, 0);
  for (let index = 0; index < timestep; index++) {
    box1.collide(box2)
    box1.update(timestep)
    box2.update(timestep)
  }
  rectMode(CENTER);
  box1.display()
  box2.display()
  // rectMode(CORNER);
  fill(0);
  textSize(50);
  text(box1.collision / prec, 0, 50)
}