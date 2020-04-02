let tree = null;
let size = 40;
let maxLevel = 5;
let n = Math.pow(2, maxLevel) - 1;
// let positions = new Array(Math.pow(2, maxLevel));
let shift = 3*size;
let positions = [];
let animationSteps = 60;

let treeValues = [];
let i = 0;

function calcPos(x, y, shift, i = 0) {
  if (i >= n) {
    return;
  }
  positions[i] = [x, y];
  calcPos(x - shift, y + 2*size, shift/2, 2*i + 1);
  calcPos(x + shift, y + 2*size, shift/2, 2*i + 2);
}

function setup() {
  createCanvas(600, 600);
  background(255, 255, 255);

  calcPos(width/2, 2*size, shift);

  fill(255);
  stroke(0, 0, 0);
  // for(let pos of positions)
  //   circle(pos[0], pos[1], size);
  
  tree = new Tree();
  let val;
  for (var i = 0; i < 12; i++) {
    val = floor(random(0, 100));
    treeValues[i] = val;
  }
  
  textAlign(CENTER, CENTER);
  textSize(20);
  // tree.calculatePositions(size);
  // tree.display(size);

  frameRate(60);

  print(positions)
  for (let i = 0; i < positions.length; i++) {
    fill(255);
    circle(positions[i][0], positions[i][1], size);
    fill(0);
    text(i, positions[i][0], positions[i][1]);
  }

}

let a = 1;

// treeValues = [50, 70, 80, 20, 30, 60]

function draw() {

  background(255);

  // for (let i = 0; i < positions.length; i++) {
  //   fill(255);
  //   circle(positions[i][0], positions[i][1], size);
  //   fill(0);
  //   text(i, positions[i][0], positions[i][1]);
  // }
     
  if (a == 1) {
    if(i < treeValues.length)
      tree.addNode(treeValues[i++]);
  }
  tree.traverse()
  a = tree.update();
  tree.display(size);
}
