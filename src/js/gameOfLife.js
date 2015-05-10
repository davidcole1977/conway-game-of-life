module.exports = (function () {
  'use strict';

  function Cell (world, coords) {
    this.isAlive = false;
    this.world = world;
    this.col = coords.col;
    this.row = coords.row;
    this.neighbours = [];
    this.liveNeighbourCount = 0;
  }

  Cell.prototype.makeAlive = function () {
    this.isAlive = true;
  };

  Cell.prototype.kill = function () {
    this.isAlive = false;
  };

  Cell.prototype.determineNeighbours = function () {
    var col,
        row,
        neighbours = [];

    for (col = Math.max(0, this.col - 1); col <= Math.min(this.world.width - 1, this.col + 1); col += 1) {
      for (row = Math.max(0, this.row - 1); row <= Math.min(this.world.height - 1, this.row + 1); row += 1) {
        if (!(this.row === row && this.col === col)) {
          neighbours.push(this.world.getCell({row: row, col: col}));
        }
      }
    }

    this.neighbours = neighbours;
  };

  Cell.prototype.determineLiveNeighbourCount = function () {
    var liveNeighbourCount = 0;
    this.determineNeighbours();

    this.neighbours.forEach(function (neighbour) {
      if (neighbour.isAlive) {
        liveNeighbourCount += 1;
      }
    });

    this.liveNeighbourCount = liveNeighbourCount;
  };

  Cell.prototype.applyRules = function () {
    if (this.isAlive && this.liveNeighbourCount < 2) {
      this.kill();
    } else if (this.isAlive && this.liveNeighbourCount > 3) {
      this.kill();
    } else if (!this.isAlive && this.liveNeighbourCount === 3) {
      this.makeAlive();
    }
  };

  function World (dimensions) {
    this.width = dimensions.width;
    this.height = dimensions.height;
    this.grid = this.makeGrid(Cell);
  }

  World.prototype.makeGrid = function () {
    var grid = [],
        row,
        col,
        world = this;

    for (row = 0; row < this.height; row += 1) {
      grid[row] = [];

      for (col = 0; col < this.width; col += 1) {
        grid[row][col] = new Cell(world, {row: row, col: col});
      }
    }

    return grid;
  };

  World.prototype.getCrudeGrid = function () {
    var grid = [];

    this.grid.forEach(function (row) {
      grid.push([]);

      row.forEach(function (cell) {
        var isAlive = cell.isAlive ? 1 : 0;
        grid[cell.row].push(isAlive);
      });
    });

    return grid;
  };

  World.prototype.setLiveCells = function (coordSet) {
    var world = this;

    coordSet.forEach(function (coords) {
      world.getCell(coords).makeAlive();
    });
  };

  World.prototype.getCell = function (coords) {
    return this.grid[coords.row][coords.col];
  };

   World.prototype.forEachCell = function (callback) {
    this.grid.forEach(function (row) {
      row.forEach(function (cell) {
        return callback(cell);
      });
    });
  };

  World.prototype.setUpCells = function () {
    this.forEachCell(function(cell) {
      cell.determineLiveNeighbourCount();
    });
  };

  World.prototype.transformCells = function () {
    this.forEachCell(function(cell) {
      cell.applyRules();
    });
  };

  World.prototype.tick = function () {
    this.setUpCells();
    this.transformCells();
  };

  World.prototype.logGrid = function () {
    var output = '';

    this.forEachCell(function(cell) {
      output += (cell.isAlive === true) ? '1 ' : '0 ';
      if (cell.col === cell.world.width - 1) {
        output += '\n';
      } 
    });

    console.log(output);
  };

  return {
    World: World,
    Cell: Cell
  };
  
}());
