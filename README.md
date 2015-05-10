# conway-game-of-life

Having attended a [Javascript Code Retreat](http://jscoderetreat.com/), which involved a number of katas on the theme of [Conway's Game Of Life](http://en.wikipedia.org/wiki/Conway's_Game_of_Life), I decided to finish off the challenge at home.

The current version is not fully tested, but does have *just* enough tests to confirm it works without a graphical user interface (GUI).

It's a first attempt and I'm not comfortable with passing the parent world object to each cell as an argument, and I'm also not comfortable with the presence of functions that purely exist to make testing easier. The tests are also far from exhaustive and the application is more fragile than it could be.

I'm sure it could be greatly improved upon, but it does appear to work.

I plan to add a graphical user interface using HTML <canvas>.

## Development

### Dependencies
* [grunt](http://gruntjs.com/)
* [node](https://nodejs.org/)

Source files live in `src/`

Mocha unit tests live in `test/`

### Set up

```bash
$ npm install
```

### Running the grunt tasks

```bash
#linting and unit tests, plus a watch task for these
$ grunt
```

*See `gruntfile.js` for more details of the grunt tasks*
