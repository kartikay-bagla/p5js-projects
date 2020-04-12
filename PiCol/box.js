class Box {
    constructor(pos_x, w, h, m) {
        this.pos = createVector(pos_x, height - w/2);
        this.vel = createVector();
        this.acc = createVector();
        this.w = w;
        this.h = h;
        this.m = m;
        this.collision = 0;
    }

    update(timestep) {
        // this.vel.add(this.acc);;
        this.pos.add(p5.Vector.div(this.vel, timestep));
        this.acc.mult(0);

        if (this.pos.x - this.w/2 < 0) {
            this.collision += 1;
            this.vel.mult(-1);
        }
    }

    collide(other) {
        if (
            this.pos.x + this.w/2 > other.pos.x - other.w/2
        ) {
            this.collision += 1;
            var masses = this.m + other.m;
            var new_vel1 = p5.Vector.add(p5.Vector.mult(this.vel, (this.m - other.m) / masses), p5.Vector.mult(other.vel, 2 * other.m / masses));
            var new_vel2 = p5.Vector.add(p5.Vector.mult(other.vel, (other.m - this.m) / masses), p5.Vector.mult(this.vel, 2 * this.m / masses)); 
            this.vel = new_vel1;
            other.vel = new_vel2;
        }
    }

    display() {
        rectMode(CENTER);
        rect(this.pos.x, this.pos.y, this.w, this.h);
    }
}