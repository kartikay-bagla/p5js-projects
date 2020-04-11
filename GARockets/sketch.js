var population;

function setup() {
  createCanvas(600, 600);
  population = new Population();
}

function draw() {
  background(0);

  noStroke();
  fill(255, 50);

  ellipse(width/2, 100, 30, 30);

  population.step();
}