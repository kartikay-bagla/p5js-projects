class Cell {
    constructor(i, j, w) {
      this.i = i;
      this.j = j;
      this.w = w;
      this.visited = false;
  
      // top right bottom left
      this.walls = [true, true, true, true];
    }
  
  
  
    show(current) {
  
      var x = this.i * this.w;
      var y = this.j * this.w;
      
      noStroke();
      if (current) {
        fill(0, 255, 0);
        rect(x, y, this.w, this.w);
      }
      else if (this.visited) {
        fill(100, 0, 100);
        rect(x, y, this.w, this.w);
      }
      
      
      stroke(255);
      if (this.walls[0]) {
        line(x, y, x + this.w, y);
      }
      if (this.walls[1]) {
        line(x + this.w, y, x + this.w, y + this.w);
      }
      if (this.walls[2]) {
        line(x, y + this.w, x + this.w, y + this.w);
      }
      if (this.walls[3]) {
        line(x, y, x, y + this.w);
      }
    }
  }