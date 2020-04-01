class Star {
  constructor() {
    this.init();
  }
  
  init() {
    this.x = random(-width/2, width/2);
    this.y = random(-height/2, height/2);
    this.speed = random(width);
    this.z = 2;
    this.size = this.z;
    this.px = this.x;
    this.py = this.y;
  }
  
  draw(speed = 0) {
    if (speed != 0) {
      this.speed = speed;
    }
    this.x /= this.speed;
    this.y /= this.speed;
    this.size = sqrt(Math.pow(this.x,2) + Math.pow(this.y,2)) / this.speed;
    print(this.size);
    this.size = map(this.size, 100, 300, 2, 5);
    
    stroke(255);
    line(this.x, this.y, this.px, this.py);
    noStroke();
    circle(this.x, this.y, this.size);

    if (this.x > width/2 || this.x < -width/2) {
      this.init();
    }
    if (this.y > height/2 || this.y < -height/2) {
      this.init();
    }
    this.px = this.x;
    this.py = this.y;
  }
}

let numStars = 200;
let starArray = [];
let val = 0;
let mval = 0;
function setup() {
  createCanvas(500, 500);
  translate(width/2, height/2);
  for (let i = 0; i < numStars; i++) {
    starArray[i] = new Star();
  }
  fill(255);
}

function draw() {
  translate(width/2, height/2);
  background(0);
  for (let i = 0; i < numStars; i++) {
    val = map(mouseX, 0, width, 0.97, 0.9999);
    starArray[i].draw(val);
  }
}