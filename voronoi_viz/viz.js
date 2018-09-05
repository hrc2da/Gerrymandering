let width = 1500;
let height = 1000;
let n = 300;
let m = 200;
let numPoints = 20;
let points = [];
let dragging = false;
let dragged_pt = null;
var party = 'red';

let grid = new Array(n);
for (let i = 0; i < m; i++) {
    grid[i] = new Array(m);
}
let cell_width = 5;

function setup() {
    createCanvas(width, height);
}

function draw() {
    background(0, 0, 0);
    for (let c = 0; c < m; c++) {
        for (let r = 0; r < n; r++) {
            // noStroke();
            fill(computeCol([r, c]));
            rect(r * cell_width, c * cell_width, cell_width, cell_width);
        }
    }
    for (let point of points) {
        stroke(255, 255, 255);
        fill(0, 0, 0);
        ellipse(point.coord[0] * cell_width, point.coord[1] * cell_width, cell_width * 2, cell_width * 2);
        stroke(0, 0, 0);
    }
    noLoop();
}

function computeCol(pt) {
    if (points.length == 0) {
        return color(0, 0, 0);
    }
    let miniCol;
    let miniCoord;
    let miniDist = 1e31;
    for (let i = 0; i < points.length; i++) {
        let currDist = getDist(points[i].coord, pt);
        if (currDist < miniDist) {
            miniCol = points[i].col;
            miniDist = currDist;
        }
    }
    return miniCol
}

function getDist(p1, p2) {
    return Math.sqrt(Math.pow(p1[0] - p2[0], 2) + Math.pow(p1[1] - p2[1], 2))
}

function randint(i) {
    return Math.floor(Math.random() * i);
}

function mouseDragged() {
    if (dragging) {
        stroke(255, 255, 255);
        fill(0, 0, 0);
        ellipse(mouseX, mouseY, cell_width * 2, cell_width * 2);
        stroke(0, 0, 0);
        return
    }

    let coord = [mouseX / cell_width, mouseY / cell_width];
    for (let point of points) {
        console.log(getDist(point.coord, coord))
        if (getDist(point.coord, coord) < 4) {
            dragging = true;
            dragged_pt = point;
        }
    }
}

function mouseReleased() {
    if (dragging) {
        dragged_pt.coord = [mouseX / cell_width, mouseY / cell_width];
        dragging = false;
        draw();
        return
    }
    stroke(255, 255, 255);
    fill(0, 0, 0);
    ellipse(mouseX, mouseY, cell_width * 2, cell_width * 2);
    stroke(0, 0, 0);

    let coord = [mouseX / cell_width, mouseY / cell_width];
    if (coord[0] > 0 && coord[1] > 0) {
        points.push({
            "col": party == 'blue' ? color(66, 134, 244) : color(193, 19, 39),
            'coord': coord
        });
        draw();
    }
}