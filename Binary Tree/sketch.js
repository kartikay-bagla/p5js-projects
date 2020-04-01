function setup() {
  createCanvas(400, 400);
  background(255, 255, 255);

  tree = new Tree();
  let val = 0;
  for (var i = 0; i < 10; i++) {
    val = floor(random(0, 100));
    print(val);
    tree.addNode(val);
  }
  print("Traversing");
  tree.traverse();

  fill(255);
  stroke(0, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(10);
  // textColor(0, 0, 0);
  tree.display();

}

// function draw() {

// }