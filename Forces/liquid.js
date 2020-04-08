class Liquid {
    constructor(start, length, val) {
        this.start = start;
        this.length = length;
        this.friction_val = val;
    }
    display() {
        fill(100, 100, 100, map(this.friction_val, 0, 1, 0, 255));
        // rect(200, 200, 200, 200);
        rect(0, this.start, width, this.length);
    }
}