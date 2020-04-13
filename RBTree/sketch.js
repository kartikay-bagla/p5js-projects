let height = 750;
let width = Math.floor((16 / 9) * height);

let borderX = 50
let borderY = 50;

let tree = null;
let treeValues = [];
let valueCount = 24;
let positions = [];

let maxLevel = (1 + Math.floor(Math.log2(valueCount))) + 1;
let nodeCount = Math.pow(2, maxLevel) - 1;

let gap = 5;
let nodeDiameter = 2 * gap*(width - 2*borderX) / ((gap + 1)*(nodeCount + 1)/2 - 1);
let xshift = (width - 2*borderX)/4;
let yshift = (height - 2*borderY) / maxLevel;

let animationSteps = 60;
let animationRate = 100;
let FPS = Math.floor(animationSteps * (animationRate/100));

function calcPos(x, y, shift, i = 0) {
  if (i >= nodeCount)
    return;

  positions[i] = [x, y];
  calcPos(x - shift, y + yshift, shift/2, 2*i + 1);
  calcPos(x + shift, y + yshift, shift/2, 2*i + 2);
}

function setup() {
  createCanvas(width, height);
  background(255, 255, 255);

  calcPos(width/2, borderY + 0.5*nodeDiameter, xshift);

  fill(255);
  stroke(0, 0, 0);

  tree = new Tree();
  for (var i = 0; i < valueCount; i++)
    treeValues[i] = floor(random(0, 200));

  console.log(treeValues);

  textAlign(CENTER, CENTER);
  textSize(20);

  frameRate(FPS);
}

let index = 0;
let frame = 0;
let nodes = [];
let last_inserted = 0;

function draw() {
  background(255);

  if(frame % animationSteps == 0) {
      let rotation_made = false;
      let node = null;

      while (nodes.length > 0) {
          node = nodes.shift();
          [node, rotation_made] = tree.applyFix(node, last_inserted);

          if(rotation_made) {
              if (nodes.length > 0) {
                  let parent = nodes[0];
                  if (node.value < parent.value)
                      parent.setLeft(node);
                  else
                      parent.setRight(node);
              }

              else
                  tree.root = node;

              break;
          }
      }

      if(!rotation_made && index < treeValues.length) {
          nodes = tree.addNode(treeValues[index]);
          last_inserted = treeValues[index];
          ++index;
      }
  }

  tree.update();
  tree.display(nodeDiameter);

  ++frame;
}
