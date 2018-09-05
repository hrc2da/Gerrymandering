var n = 60;
var m = 200;
var party = 'red';

function setup() {
    createCanvas(1500, 1500);
    let ma = new Map(n, m);
    showMap(ma);
}

function draw() {
    noLoop();
}

function showMap(map) {
    let cell_width = 10;
    let x = 100;
    let y = 100;
    fill(50, 50, 50);
    rect(x - cell_width, y - cell_width, m * cell_width + 2 * cell_width, n * cell_width + cell_width);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            if (Math.abs(map.grid[i][j].dprob - map.grid[i][j].rprob) < 0.1) {
                fill(182, 66, 244);
            } else if (map.grid[i][j].dprob - map.grid[i][j].rprob > 0) {
                fill(66, 134, 244)
            } else {
                fill(244, 65, 92);
            }
            noStroke();
            ellipse(x, y, (map.grid[i][j].dprob + map.grid[i][j].rprob) * 0.5 * (cell_width * 1.5), (map.grid[i][j].dprob + map.grid[i][j].rprob) * 0.5 * (cell_width * 1.5));
            x += cell_width;
        }
        x = 100
        y += cell_width;
    }
}