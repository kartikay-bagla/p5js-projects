class Rocket {
    constructor(dna) {
        this.pos = createVector(width/2, height - 100);
        this.vel = createVector();
        this.acc = createVector();
        this.crashed = false;
        this.reached = false;
        this.count = 0;
        if (dna) {
            this.dna = dna;
        } else {
            this.dna = []
            for (let index = 0; index < 200; index++) {
                this.dna[index] = createVector(random(-1, 1), random(-1, 1));
                this.dna[index].setMag(0.4);            
            }
        }
    }

    update(target, obsts) {
        if (target && !this.reached) {
            if (this.pos.dist(target) < 30) {
                print("reached")
                this.reached = true;
                this.pos = target;
            }
        }
        if (!this.crashed && !this.reached) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
            this.count++;
            if (this.pos.x > width || this.pos.x < 0 || this.pos.y < 0 || this.pos.y > height) {
                this.crashed= true;
            } else {
                for (let i = 0; i < obsts.length; i++) {
                    var obst = obsts[i];
                    if ((this.pos.x < obst[0] + obst[2]) && (this.pos.x > obst[0]) && (this.pos.y < obst[1] + obst[3]) && (this.pos.y > obst[1])) {
                        this.crashed = true;
                        break;
                    }
                }
            }
        }
        // print(this.pos.x, this.pos.y);
    }

    addForce(force) {
        // print("Added:", force)
        this.acc.add(force);
    }

    display() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rect(0, 0, 40, 10);
        pop();
    }
}