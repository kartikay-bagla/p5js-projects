class Population {
    constructor() {
        this.rockets = [];
        this.lifespan = 200;
        this.i = 0;
        this.num_rockets = 500;
        this.new_rand = 100;

        this.target = createVector(width/2, 100)

        for (let index = 0; index < this.num_rockets; index++) {
            this.rockets[index] = new Rocket();
        }

        // this.obsts = [[200, height/3, 200, 20], [0, 2*height/3, 200, 20]];
        this.obsts = [];

    }

    step() {
        if (this.i < this.lifespan) {
            for (let index = 0; index < this.rockets.length; index++) {
                this.rockets[index].addForce(this.rockets[index].dna[this.i])
                this.rockets[index].update(this.target, this.obsts)
                this.rockets[index].display()
            }
            for (let index = 0; index < this.obsts.length; index++) {
                var obst = this.obsts[index];
                rect(obst[0], obst[1], obst[2], obst[3]);
            }
            this.i++;
        } else {
            this.eval();
        }
    }

    eval() {
        var fits = []
        for (let index = 0; index < this.rockets.length; index++) {
            if (this.rockets[index].reached) {
                fits[index] = 1 / (10 * this.rockets[index].count);
            } else {
                fits[index] = 1/(this.rockets[index].pos.dist(this.target) * this.rockets[index].count);
                if (this.rockets.crashed) {
                    fits[index] /= 100;
                }
            }
        }
        var m = fits.reduce((previous, current) => current += previous);
        m /= fits.length;
        print(m, max(fits));
        m = max(fits)
        var v = 0;
        for (let index = 0; index < fits.length; index++) {
            v = fits[index] * 100 / m;
            // if (v < 1) {
            //     v *= 10;
            // }
            fits[index] = v;
        }
        var parentPool = []
        for (let index = 0; index < fits.length; index++) {
            for (let count = 0; count < fits[index]; count++) {
                parentPool.push(this.rockets[index].dna);
            }
        }
        var next_rockets = []
        var l = parentPool.length
        for (let index = 0; index < this.num_rockets - this.new_rand; index++) {
            var parentA = parentPool[floor(random(0, l))];
            var parentB = parentPool[floor(random(0, l))];
            while (parentA != parentB) {
                parentB = parentPool[floor(random(0, l))];
            }
            var mid = floor(parentA.length);
            var child = [];
            for (let i = 0; i < parentA.length; i++) {
                if (i < mid) {
                    child[i] = parentA[i];
                } else {
                    child[i] = parentB[i];
                }
                if (random() < 0.05) {
                    var rand_vec = createVector(random(-1, 1), random(-1, 1)).setMag(0.01);
                    child[i].add(rand_vec);
                }
            }
            next_rockets.push(new Rocket(child));
        }
        for (let index = 0; index < this.new_rand; index++) {
            next_rockets.push(new Rocket());
        }
        print(next_rockets.length);
        this.rockets = next_rockets;
        this.i = 0;
        this.new_rand = floor(this.new_rand * 3/4);
        

    }

}