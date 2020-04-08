class Ball {
    constructor(radius, x) {
        this.pos = createVector(x, radius * 2);
        this.radius = radius;
        this.mass = radius;
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
    }

    addForce(force) {
        let addacc = force.copy()
        addacc.div(this.mass)
        this.acc.add(addacc);
    }

    update() {
        fill(150, 150, 150, 100);
        strokeWeight(5);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
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

        this.acc.x = 0;
        this.acc.y = 0;
    }

    isInside(liq) {
        if (this.pos.y > liq.start && this.pos.y < liq.start + liq.length) {
            let drag = this.vel.copy().normalize();
            drag.mult(this.vel.magSq());
            drag.mult(-1 * liq.friction_val);
            this.addForce(drag);
        }
    }

    display() {
        ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
    }
}