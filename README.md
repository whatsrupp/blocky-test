# Blocky Puzzle

## To get started

You will need a recent version of [Node]. If you do not have it installed already, we find [nvm] to be a handy script to install and even juggle between versions of Node without too much hassle.

On most projects, we have transitioned into using [Yarn], Facebook's package manager in favour of npm. Either one will do to install and run this project, as well as run its tests.

```sh
yarn
# or `npm install`
yarn start
# or `npm start`
```

`http://localhost:9100/` will open automatically on the blocky app, live-reloading as you develop.

Use `yarn test` to run the unit tests on the terminal. `yarn test --watch` will only run test files relevant to changes since your last commit, and rerun them every time you save.

## Task

Clicking on a block should remove (or hide) itself and all blocks of the same colour that are connected to the target element, then allow the blocks above the removed to "fall down". The "gravity" is similar to [Tetris], but every block is its own 1x1 entity. Unlike Tetris, it's clicking on a block that triggers the removal and fall of blocks.

For example, given:

![Initial state](./initial.jpg)

After clicking one of the bottom right blue boxes, it should look like this:

![state 2](./expectedResult.jpg)

[node]: https://nodejs.org/en/ "Node is a JavaScript runtime built on Chrome's V8 JavaScript engine"
[nvm]: https://github.com/creationix/nvm 'Because nobody wants to upgrade and downgrade Node per project'
[yarn]: https://yarnpkg.com/en/docs/install 'Never go full Facebook though'
[tetris]: https://en.wikipedia.org/wiki/Tetris "You've played Tetris, right?"

## Approach and Notes

Fun task! Particulary enjoyed customising it a bit!

I ended up implementing this with the following test-driven approach:

1. set up some tests for the non-rendering logic
2. make the tests pass!

With the following logic:

1. Find out what needs to be deleted - this is done with a recursive search from the root block
2. Delete the blocks in a batch operation - go through the updated columns and delete the elements from the end of the array so that future updates.
3. update the DOM

Initially I was just refreshing the whole grid after an update to the grid, but after scaling this up to a grid size of 500x500 blocks it was clear that it would need to be optimised for larger grids. To deal with this I put in some primitive memoiztion that meant that only columns that needed updates were rerendered.

The run time is O(nr) where n is the amount of blocks in a column and r is the number of columns needing an update.

## Possible Refactors:

Use an object stored in the BlockGrid class instead of an instance property of the Block class to mark the nodes as ready to delete - this would keep the full logic of the delete operation in one logical place.

There seems to be two main concerns - 1) maintaining the state of the grid 2) rendering it. I think it could be good to keep them as separate as possible.

## Feedback:

Really enjoyed a tech test where you don't have to scaffold out an express app etc or have to fire up a create react app to get started - the initial set up allowed me to just get stuck into the problem straight away which was great when I'm a bit pressed for time today!
