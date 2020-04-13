let RED = '#FF0000';
let BLACK = '#000000';

let LEFT = 0;
let RIGHT = 1;

class Tree {
    constructor()
    { this.root = null; }

    addNode(value) {
        console.log('Adding', value);

        let nodes = this.insert(this.root, value, 0);

        this.root = nodes[nodes.length - 1];
        this.root.setColour(BLACK);

        return nodes;
    }

    getColour(node) {
        if(node == null)
            return BLACK;
        return node.colour;
    }

    leftOf(pos)
    { return 2*pos + 1; }

    getLeft(node) {
        if(node == null)
            return null;
        return node.left
    }

    rightOf(pos)
    { return 2*pos + 2; }

    getRight(node) {
        if(node == null)
            return null;
        return node.right;
    }

    parentOf(pos)
    { return floor((pos - 1)/2); }

    rightRotate(x) {
        let y = this.getLeft(x);
        x.setLeft(this.getRight(y));
        y.setRight(x);

        x.setColour(RED);
        y.setColour(BLACK);

        y.updatePosition(this.parentOf(y.pos));
        return y;
    }

    leftRightRotate(x) {
        x.setLeft(this.leftRotate(this.getLeft(x)));
        return this.rightRotate(x);
    }

    leftRotate(x) {
        let y = this.getRight(x);
        x.setRight(this.getLeft(y));
        y.setLeft(x);

        x.setColour(RED);
        y.setColour(BLACK);

        y.updatePosition(this.parentOf(y.pos));
        return y;
    }

    rightLeftRotate(x) {
        x.setRight(this.rightRotate(this.getRight(x)));
        return this.leftRotate(x);
    }

    insert(node, value, pos) {
        if(node == null) {
            let newNode = new Node(value, pos);
            return [newNode];
        }

        let nodes = [];
        if(value < node.value) {
            nodes = this.insert(node.left, value, 2*pos + 1);

            let left = nodes[nodes.length - 1];
            node.setLeft(left);
        }

        else {
            nodes = this.insert(node.right, value, 2*pos + 2);

            let right = nodes[nodes.length - 1];
            node.setRight(right);
        }

        nodes.push(node);
        return nodes;
    }

    applyFix(node, value) {
        let g = node;
        if(this.getColour(g) == RED)
            return [g, false];

        let p = null;
        let u = null;
        let x = null;

        let first_imbalance;
        let second_imbalance;

        if(value < g.value) {
            p = g.left;
            u = g.right;
            first_imbalance = LEFT;
        }
        else {
            p = g.right;
            u = g.left;
            first_imbalance = RIGHT;
        }

        if(this.getColour(p) == BLACK)
            return [g, false];

        if(value < p.value) {
            x = p.left;
            second_imbalance = LEFT;
        }
        else {
            x = p.right;
            second_imbalance = RIGHT;
        }

        if(this.getColour(x) == BLACK)
            return [g, false];

        if(this.getColour(u) == RED) {
            g.setColour(RED);
            p.setColour(BLACK);
            u.setColour(BLACK);
        }

        else {
            if(first_imbalance == LEFT) {
                if(second_imbalance == LEFT)
                    g = this.rightRotate(g);
                else
                    g = this.leftRightRotate(g);
            }

            else {
                if(second_imbalance == RIGHT)
                    g = this.leftRotate(g);
                else
                    g = this.rightLeftRotate(g);
            }
        }

        return [g, true];
    }

    traverse() {
        if (this.root != null)
            this.root.traverse();
    }

    display(size) {
        if (this.root != null)
            this.root.display(size);
    }

    update() {
        if (this.root != null)
            return this.root.update();
        return 0;
    }
}

class Node {
    constructor(value, pos) {
        this.value = value;
        this.colour = RED;
        this.pos = pos;

        this.left = null;
        this.right = null;

        this.x = width/2;
        this.y = -height/10;

        this.vx = 0;
        this.vy = 0;
        this.updatePosition(this.pos);
    }

    setColour(colour)
    {   this.colour = colour; }

    setLeft(left)
    {  this.left = left; }

    setRight(right)
    { this.right = right; }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        let dx = abs(this.x - positions[this.pos][0]);
        let dy = abs(this.y - positions[this.pos][1]);
        if(dx < 0.01 && dy < 0.01) {
            this.vx = 0;
            this.vy = 0;
        }

        if (this.left != null)
            this.left.update();
        if (this.right != null)
            this.right.update();
    }

    updatePosition(new_position) {
        this.pos = new_position;

        let target_pos = [width/2, -height/10];
        if(this.pos < positions.length)
            target_pos = positions[this.pos];
        else
            console.log(this.pos, 'has exceeded maximum allowed depth');

        this.vx = (target_pos[0] - this.x) / animationSteps;
        this.vy = (target_pos[1] - this.y) / animationSteps;

        if (this.left != null)
            this.left.updatePosition(2*this.pos + 1);
        if (this.right != null)
            this.right.updatePosition(2*this.pos + 2);
    }

    traverse() {
        if (this.left != null)
            this.left.traverse();

        print(this.value, this.colour);

        if (this.right != null)
            this.right.traverse();
    }

    display(size) {
        stroke(0);
        if (this.left != null) {
            line(this.x, this.y, this.left.x, this.left.y);
            this.left.display(size);
        }

        stroke(0);
        if (this.right != null) {
            line(this.x, this.y, this.right.x, this.right.y);
            this.right.display(size);
        }

        fill(255);
        stroke(this.colour);
        circle(this.x, this.y, size);

        fill(this.colour);
        text(this.value, this.x, this.y);
    }
}
