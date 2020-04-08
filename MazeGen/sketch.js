var cells = [];
var w = 40;
var neighbor;
var neighbor;
var current;
var stack = [];

function setup() {
  createCanvas(400, 400);
  // frameRate(20);
  
  for (var i = 0; i < w; i++) {
    cells[i] = [];
    for (var j = 0; j < w; j++) {
      cells[i][j] = new Cell(i, j, 400 / w);
    }
  }
}

var i = 0, j = 0, t;

var next_i, next_j;

function draw() {
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
    for (var y = 0; y < w; y++) {
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