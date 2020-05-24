var cells = [];
var h;
var w;
var neighbor;
var neighbor;
var current;
var stack = [];
var i, j, t;
var next_i, next_j;

function windowResized() {
  setup()
}

function setup() {
  var canvasDiv = document.getElementById('canvas');
  var width = canvasDiv.offsetWidth;
  var height = canvasDiv.offsetHeight;
  var sketchCanvas = createCanvas(width,height);
  sketchCanvas.style('z-index', -1);
  sketchCanvas.position(0, 0);

  w = 40;
  var cell_width = int(width/w);
  h = int(height / cell_width);
  w++;
  h++;
  sketchCanvas.parent("canvas");
  // frameRate(20);

  for (var x = 0; x < w; x++) {
    cells[x] = [];
    for (var y = 0; y < h; y++) {
      cells[x][y] = new Cell(x, y, cell_width);
    }
  }
  
  i = 0;
  j = 0;
}

function draw() {
  // print("loop")
  background(100);
  current = cells[i][j];
  current.visited = true;
  neighbor = chooseNeighbor(cells, i, j);
  if (neighbor) {
    stack.push([i, j]);
    next_i = neighbor[0];
    next_j = neighbor[1];
  }
  else {
    t = stack.pop();
    if (t) {
      next_i = t[0];
      next_j = t[1];
    } else {noLoop();}
  }
  clearWalls(cells, i, j, next_i, next_j);
  i = next_i;
  j = next_j;
  
  show_all(cells);
  current.show(current= true);
}

function clearWalls(cells, i, j, ni, nj) {
  if (j-nj == 1) {
    cells[i][j].walls[0] = false;
    cells[ni][nj].walls[2] = false;
  } else if (j-nj == -1) {
    cells[i][j].walls[2] = false;
    cells[ni][nj].walls[0] = false;
  } else if (i-ni == 1) {
    cells[i][j].walls[3] = false;
    cells[ni][nj].walls[1] = false;
  } else if (i-ni == -1) {
    cells[i][j].walls[1] = false;
    cells[ni][nj].walls[3] = false;
  }
}

function show_all(cells) {
  for (var x = 0; x < w; x++) {
    for (var y = 0; y < h; y++) {
      cells[x][y].show();
    }
  }
}

function chooseNeighbor(cells, i, j) {
  var neighbors = [];
  if (i - 1 >= 0) {
    if (!cells[i - 1][j].visited) {
      neighbors.push([i - 1, j]);
    }
  }
  if (i + 1 < cells.length) {
    if (!cells[i + 1][j].visited) {
      neighbors.push([i + 1, j]);
    }
  }
  if (j - 1 >= 0) {
    if (!cells[i][j - 1].visited) {
      neighbors.push([i, j - 1]);
    }
  }
  if (j + 1 < cells[0].length) {
    if (!cells[i][j + 1].visited) {
      neighbors.push([i, j + 1]);
    }
  }
  if (neighbors.length == 0) {
    return undefined
  }
  
  var choice = floor(random(0, neighbors.length));
  return neighbors[choice];
}