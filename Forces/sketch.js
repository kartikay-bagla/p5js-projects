let balls = [];

let wind;
let applyWind;
let gravity;
let ball_g;

let liqs = [];

function setup() {
  createCanvas(500, 700);
  for(let i = 0; i < 10; i++) {
    balls[i] = new Ball(floor(random(25, 75)), (width/10) * i + 15);
  }
  wind = createVector(5, 0);
  gravity = createVector(0, 0.25);
  
  for(let i = 0; i < 3; i++) {
    liqs[i] = new Liquid(405 + (i * 100), 100, 0.6 * (i+1));
  }

}

function draw() {
  background(255);

  if (mouseIsPressed) {
    applyWind = true;
  } else {
    applyWind = false;
  }

  for (let j = 0; j < 3; j++) {
    liqs[j].display()
  }

  for(let i = 0; i < 10; i++) {
    for (let j = 0; j < 3; j++) {
      balls[i].isInside(liqs[j]);
    }
    ball_g = gravity.copy();
    ball_g.mult(balls[i].mass);
    balls[i].addForce(ball_g);
    if (applyWind) {
      balls[i].addForce(wind);
    }
    balls[i].update();
    balls[i].display();
  } 
}