let particles = [];
let numParticles = 20;
let b = 0;

let width = 700;
let height = 700;

function setup() {
  
  createCanvas(700, 700);

  print(width, height)
  
  for (let i = 0; i < numParticles; i++) {
    let x = floor(random() * width);
    let y = floor(random() * height);
    let r = 10 + floor(random() * 20);
    
    particles[i] = new Particle(x, y, r, r/4);
  }

  background(255);
}

function draw() {
  background(255);
  
  stroke(50, 100);
  fill(150, 100);
  for (let i = 0; i < numParticles; i++) {
    for (let j = 0; j < numParticles; j++) {
      if (i != j) {
        // particles[j].collide(particles[i]);
        particles[j].addGrav(particles[i]);
      }
    }
    particles[i].update();
    particles[i].display();
  }
}