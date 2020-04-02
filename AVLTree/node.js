class Tree {
    constructor()
    { this.root = null; }
    
    addNode(value, pos = 0) {
        if (this.root == null)
        this.root = new Node(value, pos);
        else
        this.root.addValue(value);
    }
    traverse()
    { 
        // print("Traverse")
        this.root.traverse(); 
    }
    
    display(size)
    { this.root.display(size); }
    
    calculatePositions(size) {
        this.root.calculatePositions(width / 2, size *2, size * 3, size);
    }

    update() {
        return this.root.update();
    }
}

class Node {
    constructor(value, pos) {
        this.value = value;
        this.pos = pos;

        this.left = null;
        this.right = null;
        this.x = positions[pos][0];
        this.y = positions[pos][1];
        this.vx = 0;
        this.vy = 0;
        
        this.height = 0;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // print("UPDATE", this.value, positions[this.pos][0] - this.x, positions[this.pos][1] - this.y)

        if(abs(this.x - positions[this.pos][0]) <= 0.005 && abs(this.y - positions[this.pos][1]) <= 0.005 ) {
            this.vx = 0;
            this.vy = 0;
        }

        let a = 1;
        let b = 1;

        if(this.left != null) {
            a = this.left.update();
        }
        if(this.right != null) {
            b = this.right.update();
        }

        return this.vx == 0 && this.vy == 0 && a && b
    }
    
    addValue(value, pos = 0) {
        if (value < this.value) {
            if (this.left == null)
                this.left = new Node(value, 2*pos + 1);
            else
                this.left.addValue(value, 2*pos + 1);
        }
        else {
            if (this.right == null)
                this.right = new Node(value, 2*pos + 2);
            else
                this.right.addValue(value, 2*pos + 2);
        }
        
        let delta = this.heightDifference();
        if(delta > 1) {
            delta = this.left.heightDifference();
            
            if(delta > 0) {
                this.LeftFix();
            }
            else {
                this.LeftRightFix();
            }
        }
        
        if(delta < -1) {
            delta = this.right.heightDifference();
            
            if(delta < 0)
                this.RightFix();
            else
                this.RightLeftFix();
        }
        
        this.updateHeight();
    }

    updatePosition(new_position) {
        this.pos = new_position;
        // print(this.pos, this.value, [this.x, this.y], positions[this.pos]);

        let target_pos = positions[this.pos];

        this.vx = (target_pos[0] - this.x) / animationSteps;
        this.vy = (target_pos[1] - this.y) / animationSteps;

        if (this.left != null) {
            this.left.updatePosition(2*new_position + 1);
        }    
        if (this.right != null) {
            this.right.updatePosition(2*new_position + 2);
        }
    }

    updateHeight() {
        let height = -1;
        
        if (this.left != null)
        height = max(height, this.left.height);
        if (this.right != null)
        height = max(height, this.right.height);
        
        this.height = 1 + height;
    }
    
    heightDifference() {
        let delta = 0;
        
        if (this.left == null)
        delta += (-1);
        else
        delta += this.left.height;
        
        if (this.right == null)
        delta -= (-1);
        else
        delta -= this.right.height;
        
        return delta;
    }
    
    LeftFix() {
        let temp = this.value;
        this.value = this.left.value;
        this.left.value = temp;
        
        let y = this;
        let x = this.left;
        
        y.left = x.left;
        x.left = x.right;
        x.right = y.right;
        y.right = x;
        
        x.updateHeight();
        y.updateHeight();

        if(y.left != null) {
            y.left.updatePosition(2*y.pos + 1);
        }
        if(y.right != null) {
            y.right.updatePosition(2*y.pos + 2);
        }
    }
    
    LeftRightFix() {
        this.left.RightFix();
        this.LeftFix();
    }
    
    RightFix() {
        let temp = this.value;
        this.value = this.right.value;
        this.right.value = temp;
        
        let y = this;
        let x = this.right;
        
        y.right = x.right;
        x.right = x.left;
        x.left = y.left;
        y.left = x;
        
        x.updateHeight();
        y.updateHeight();

        // print("Moving: " + this.pos)
        if(y.left != null) {
            // print(2*y.pos + 1)
            y.left.updatePosition(2*y.pos + 1);
        }
        if(y.right != null) {
            // print(2*this.pos + 2)
            y.right.updatePosition(2*y.pos + 2);
        }
    }
    RightLeftFix() {
        this.right.LeftFix();
        this.RightFix();
    }
    
    traverse() {
        if (this.left != null)
        this.left.traverse();
        
        // print(this.value, this.pos);
        
        if (this.right != null)
        this.right.traverse();
    }
    
    // display(x, y, shift, size) {
    //     if (this.left != null) {
    //         line(x, y, x - shift/2, y + 2*size);
    //         this.left.display(x - shift, y + 2*size, shift/2, size);
    //     }
    // if (this.right != null) {
    //     line(x, y, x + shift, y + 2*size);
    //     this.right.display(x + shift, y + 2*size, shift/2, size);
    // }
    //     fill(255);
    //     circle(x, y, size);
    //     fill(0);
    //     text(this.value, x, y);
    // }
    
    calculatePositions(x, y, shift, size) {
        this.x = x;
        this.y = y;
        
        if (this.left != null) {
            this.left.calculatePositions(x - shift, y + 2*size, shift/2, size);
        }
        if (this.right != null) {
            this.right.calculatePositions(x + shift, y + 2*size, shift/2, size);
        }
    }
    
    display(size) {
        if (this.left != null) {
            line(this.x, this.y, this.left.x, this.left.y);
            this.left.display(size);
        }
        if (this.right != null) {
            line(this.x, this.y, this.right.x, this.right.y);
            this.right.display(size);
        }
        fill(255);
        circle(this.x, this.y, size);
        fill(0);
        text(this.value, this.x, this.y);
    }
}
