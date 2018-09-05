class Map {
    constructor(n, m) {
        this.grid = new Array(n);
        for (let i = 0; i < this.grid.length; i++) {
            this.grid[i] = new Array(m);
        }

        this.numPopCenters = 30;
        this.demPopCenters = [];
        this.cityPop = 125;
        for (let i = 0; i < this.numPopCenters; i++) {
            this.demPopCenters.push([this.randint(n), this.randint(m)]);
        }
        this.repPopCenters = [];
        for (let i = 0; i < this.numPopCenters; i++) {
            this.repPopCenters.push([this.randint(n), this.randint(m)]);
        }

        this.initializeGrid();
        this.normalizeGrid();
        this.fillGrid();
    }

    initializeGrid() {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                let leaningSample = this.samplePopulation(i, j);
                this.grid[i][j] = new Cell(leaningSample[0], leaningSample[1]);
            }
        }
    }

    normalizeGrid() {
        let maxd = 0;
        let maxr = 0;
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                if (this.grid[i][j].dprob > maxd) {
                    maxd = this.grid[i][j].dprob;
                }
                if (this.grid[i][j].rprob > maxr) {
                    maxr = this.grid[i][j].rprob;
                }
            }
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                this.grid[i][j].dprob /= maxd;
                this.grid[i][j].rprob /= maxr;
            }
        }
    }

    fillGrid() {
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < m; j++) {
                this.grid[i][j].population = (this.grid[i][j].dprob + this.grid[i][j].rprob) * 0.5 * this.cityPop;
            }
        }
    }

    randint(i) {
        return Math.floor(Math.random() * i);
    }

    samplePopulation(x, y) {
        let citySpread = 10;
        let dprob = 0;
        let rprob = 0;
        for (let i = 0; i < this.numPopCenters; i++) {
            dprob += this.sampleGaussian(this.demPopCenters[i][0], citySpread, x) * this.sampleGaussian(this.demPopCenters[i][1], citySpread, y);
            rprob += this.sampleGaussian(this.repPopCenters[i][0], citySpread, x) * this.sampleGaussian(this.repPopCenters[i][1], citySpread, y);
        }
        return [dprob, rprob];
    }

    sampleGaussian(mean, std, x) {
        return (1 / Math.sqrt(2 * Math.PI * Math.pow(std, 2))) * Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(std, 2))));
    }

}