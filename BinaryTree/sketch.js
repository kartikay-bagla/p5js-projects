let tree;
let myButton;
let gui;

var radius = 40;
var radiusMin = 30;
var radiusMax = 60;
var nodes = 10;
var nodesMin = 5;
var nodesMax = 20;

function drawTree() {
  background(255, 255, 255);
  
  tree = new Tree();
  let val = 0;
  for (var i = 0; i < nodes; i++) {
    val = floor(random(0, 100));
    tree.addNode(val);
  }

  
  setValues();
  tree.display(radius);

}

function setValues() {
  fill(255);
  stroke(0);
  textAlign(CENTER, CENTER);
  textSize(20);
}

function setup() {
  createCanvas(600, 600);

  gui = createGui("Binary Tree").setPosition(width, 20);
  gui.addGlobals('radius', 'nodes');

  let buttonLength = 30;
  let buttonWidth = 50;
  myButton = new Clickable();
  myButton.onPress = drawTree;
  myButton.text = "Execute";
  myButton.textColor = "#FFFFFF"
  myButton.color = "#000000"
  myButton.stroke = "#808080"
  myButton.resize(buttonWidth, buttonLength);
  myButton.locate(width - buttonWidth, 0);

  drawTree();
}

function draw() {
  myButton.draw();
}