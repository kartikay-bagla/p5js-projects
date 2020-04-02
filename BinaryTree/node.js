class Tree {
    constructor() {
        this.root = null;
    }
    addNode(value) {
        if (this.root == null) {
            this.root = new Node(value);
        } else {
        this.root.addValue(value);
        }
    }
    traverse() {
        this.root.traverse();
    }

    display(size) {
        this.root.display(width/2, size * 2, size * 3, size);
    }
}

class Node {

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
    
    addValue(value,) {
        if (value < this.value) {
            if (this.left == null) {
                this.left = new Node(value);
            }
            else this.left.addValue(value);
        } else {
            if (this.right == null) {
                this.right = new Node(value);
            }
            else {
                this.right.addValue(value);
            }
        }
    }

    traverse() {
        if (this.left != null) {
            this.left.traverse();
        }
        print(this.value);
        if (this.right != null) {
            this.right.traverse();
        }
    }

    display(x, y, shift, size) {
        if (this.left != null) {
            line(x, y, x-shift, y+size*2);
            this.left.display(x-shift, y+size*2, shift/2, size);
        }
        if (this.right != null) {
            line(x, y, x+shift, y+size*2);
            this.right.display(x+shift, y+size*2, shift/2, size);
        }
        fill(255);
        circle(x, y, size);
        fill(0);
        text(this.value, x, y);
    }

}