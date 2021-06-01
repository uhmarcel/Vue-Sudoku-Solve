<template>
  <SudokuBoard v-bind:sudoku="board"></SudokuBoard>
</template>

<script>
import SudokuBoard from './components/SudokuBoard.vue'
import * as API from './services/api'

export default {
  name: 'App',
  components: {
    SudokuBoard
  },
  data() {
    return {
      board: [
        [1, null, null, null, null, null, null, 4, 5],
        [4, null, null, 7, null, null, null, null, null],
        [null, 5, 7, null, null, null, 3, 8, null],
        [8, null, null, 5, 9, null, 4, null, null],
        [null, null, 6, null, 2, null, 5, null, null],
        [null, null, 9, null, 7, 3, null, null, 8],
        [null, 1, 5, null, null, null, 8, 6, null],
        [null, null, null, null, null, 8, null, null, 7],
        [9, 7, null, null, null, null, null, null, 4],
      ]
    }
  },
  async mounted() {
    const puzzleId = document.location.pathname.substring(1);

    API.getPuzzle(puzzleId).then(puzzle => {
      this.board = puzzle;
    });
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
