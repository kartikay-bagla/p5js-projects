let gravConst = 0.05;

class Particle {
    constructor(x, y, rad, mass) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.rad = rad;
        this.mass = mass;
    }

    addGrav(other) {
        let r = p5.Vector.sub(this.pos, other.pos);
        if (r < this.rad + other.rad) {
            return;
        }
        let force = gravConst * this.mass * other.mass / r.magSq();
        // print(force)
        r.normalize();
        r.mult(force);
        other.addForce(r);
    }

    collide(other) {
        let d = this.pos.dist(other.pos);
        if(d <= this.rad + other.rad) {
            let first_half = p5.Vector.mult(this.vel, this.mass - other.mass);
            let second_half = p5.Vector.mult(other.vel, 2*other.mass);

            this.vel = p5.Vector.add(first_half, second_half);
            this.vel.div(this.mass + other.mass);
        }
    }

    addForce(force) {
        let acc = force.copy();
        acc.div(this.mass);
        this.acc.add(acc);
    }

    update() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);

        this.vel.limit(10);

        if (this.pos.x > width) {
            this.vel.x *= -1;
            this.pos.x = width;
        } else if (this.pos.x < 0) {
            this.vel.x *= -1;
            this.pos.x = 0;
        }
        if (this.pos.y > height) {
            this.vel.y *= -1;
            this.pos.y = height;
        } else if (this.pos.y < 0) {
            this.vel.y *= -1;
            this.pos.y = 0;
        }


    }

    display() {
        ellipse(this.pos.x, this.pos.y, this.rad, this.rad);
    }

}