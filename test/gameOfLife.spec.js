(function () {

  var expect = require('chai').expect,
      World = require('../src/js/gameOfLife').World,
      Cell = require('../src/js/gameOfLife').Cell;

  // 0 0 0 0 0
  // 0 0 0 0 0
  // 0 1 1 1 0
  // 0 0 0 0 0
  // 0 0 0 0 0
  var gridSetup1 = [
        {row: 2, col: 1},
        {row: 2, col: 2},
        {row: 2, col: 3}
      ];

  // 1 0 0 0 1
  // 1 1 0 0 0
  // 0 0 1 1 0
  // 1 1 1 0 0
  // 1 1 0 1 1
  var gridSetup2 = [
        {row: 0, col: 0},
        {row: 0, col: 4},
        {row: 1, col: 0},
        {row: 1, col: 1},
        {row: 2, col: 2},
        {row: 2, col: 3},
        {row: 3, col: 0},
        {row: 3, col: 1},
        {row: 3, col: 2},
        {row: 4, col: 0},
        {row: 4, col: 1},
        {row: 4, col: 3},
        {row: 4, col: 4}
      ];

  describe('GameOfLife', function () {

    describe('Cell(): simple methods', function () {
      var cell;

      beforeEach(function () {
        cell = new Cell(null, {row: 0, col: 0});
      });

      it('is initially dead', function () {
        expect(cell.isAlive).to.equal(false);
      });

      it('can be made live', function () {
        cell.makeAlive();
        expect(cell.isAlive).to.equal(true);
      });

      it('can be made dead', function () {
        cell.makeAlive();
        cell.kill();
        expect(cell.isAlive).to.equal(false);
      });
    });

    describe('Cell(): complex methods', function () {
      var world;
      
      beforeEach(function () {
        world = new World({width: 5, height: 5});
        world.setLiveCells(gridSetup2);
      }); 

      describe('determineLiveNeighbourCount', function () {

        it('determines number of live neighbours: centre of grid', function () {
          var cell = world.getCell({row: 2, col: 2});
          cell.determineLiveNeighbourCount();

          expect(cell.liveNeighbourCount).to.equal(4);
        });

        it('determines number of live neighbours: top left of grid', function () {
          var cell = world.getCell({row: 0, col: 0});
          cell.determineLiveNeighbourCount();

          expect(cell.liveNeighbourCount).to.equal(2);
        });

        it('determines number of live neighbours: top right of grid', function () {
          var cell = world.getCell({row: 0, col: 4});
          cell.determineLiveNeighbourCount();

          expect(cell.liveNeighbourCount).to.equal(0);
        });

        it('determines number of live neighbours: bottom left of grid', function () {
          var cell = world.getCell({row: 4, col: 0});
          cell.determineLiveNeighbourCount();

          expect(cell.liveNeighbourCount).to.equal(3);
        });

        it('determines number of live neighbours: bottom right of grid', function () {
          var cell = world.getCell({row: 4, col: 4});
          cell.determineLiveNeighbourCount();

          expect(cell.liveNeighbourCount).to.equal(1);
        });

      });
      
    });

    describe('World()', function () {

      it('has correct dimensions when initialised', function () {
        var world = new World({width: 8, height: 16});

        expect(world.width).to.equal(8);
        expect(world.height).to.equal(16);
      });

      describe('setLiveCells(), getCell()', function () {

        it('can set live cells in bulk and retrieve cell values individually', function () {
          var world = new World({width: 8, height: 8});

          world.setLiveCells([
            {row: 0, col: 1},
            {row: 4, col: 7},
            {row: 3, col: 5}
          ]);

          expect(world.getCell({row: 0, col: 1}).isAlive).to.equal(true);
          expect(world.getCell({row: 4, col: 7}).isAlive).to.equal(true);
          expect(world.getCell({row: 3, col: 5}).isAlive).to.equal(true);

          expect(world.getCell({row: 0, col: 0}).isAlive).to.equal(false);
          expect(world.getCell({row: 7, col: 7}).isAlive).to.equal(false);
          expect(world.getCell({row: 2, col: 6}).isAlive).to.equal(false);
        });
        
      });

      describe('tick()', function () {
        var world;

        beforeEach(function () {
          world = new World({width: 5, height: 5});
        });
        
        it('transforms cells according to game of life rules: 5x5 grid scenario 1', function () {
          var expectedCrudeGrid = [
            [0,0,0,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,1,0,0],
            [0,0,0,0,0]
          ];
          world.setLiveCells(gridSetup1);

          world.tick();

          expect(world.getCrudeGrid()).to.deep.equal(expectedCrudeGrid);
        });

        it('transforms cells according to game of life rules: 5x5 grid scenario 2', function () {
          var expectedCrudeGrid = [
            [1,1,0,0,0],
            [1,1,1,1,0],
            [0,0,0,1,0],
            [1,0,0,0,1],
            [1,0,0,1,0]
          ];
          world.setLiveCells(gridSetup2);

          world.tick();

          expect(world.getCrudeGrid()).to.deep.equal(expectedCrudeGrid);
        });

      });

    });

  });

})();
