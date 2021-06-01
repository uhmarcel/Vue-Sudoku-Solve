<template>
  <div class="board">
    <div class="grid">
      <div v-for="(row, i) in board" v-bind:key="i" class="row">
        <div v-for="(col, j) in row" v-bind:key="j" class="cell" v-bind:class="{ given: givens[i][j] }">
          {{ col }}
        </div>
      </div>
    </div>

    <svg id="svgrenderer" class="boardsvg" xmlns="http://www.w3.org/2000/svg" version="1.1" draggable="false" style="vector-effect: non-scaling-stroke; width: 576px; height: 576px; margin: 0px;" viewBox="0 0 576 576">
      <g id="cell-grids">
        <path class="cell-grid" d="M0 0 L576 0 M0 64 L576 64 M0 128 L576 128 M0 192 L576 192 M0 256 L576 256 M0 320 L576 320 M0 384 L576 384 M0 448 L576 448 M0 512 L576 512 M0 576 L576 576 M0 0 L0 576 M64 0 L64 576 M128 0 L128 576 M192 0 L192 576 M256 0 L256 576 M320 0 L320 576 M384 0 L384 576 M448 0 L448 576 M512 0 L512 576 M576 0 L576 576"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M0 0 L96 0 L192 0 L192 96 L192 192 L96 192 L0 192 L0 96 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M0 192 L96 192 L192 192 L192 288 L192 384 L96 384 L0 384 L0 288 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M0 384 L96 384 L192 384 L192 480 L192 576 L96 576 L0 576 L0 480 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M192 0 L288 0 L384 0 L384 96 L384 192 L288 192 L192 192 L192 96 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M192 192 L288 192 L384 192 L384 288 L384 384 L288 384 L192 384 L192 288 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M192 384 L288 384 L384 384 L384 480 L384 576 L288 576 L192 576 L192 480 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M384 0 L480 0 L576 0 L576 96 L576 192 L480 192 L384 192 L384 96 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M384 192 L480 192 L576 192 L576 288 L576 384 L480 384 L384 384 L384 288 Z"></path>
        <path fill="none" stroke="rgba(0, 0, 0, 1)" stroke-width="3px" class="cage-box" shape-rendering="geometricprecision" vector-effect="non-scaling-stroke" d="M384 384 L480 384 L576 384 L576 480 L576 576 L480 576 L384 576 L384 480 Z"></path>
      </g>
    </svg>
  </div>

  <div class="controls">
    <button @click="solve">Solve</button>
  </div>
</template>

<script>
import { solveSudoku } from "../services/sudoku";

export default {
  name: 'SudokuBoard',
  props: {
    sudoku: Array
  },
  data() {
    return {
      board: this.sudoku.map(row => row.map(cell => cell)),
      givens: this.sudoku.map(row => row.map(cell => cell !== null))
    }
  },
  methods: {
    solve: function() {
      solveSudoku(this.board);
    }
  },
  watch: { 
    sudoku: function(nextSudoku) { 
      this.board = nextSudoku.map(row => row.map(cell => cell))
      this.givens = nextSudoku.map(row => row.map(cell => cell !== null))
    }
  }
}
</script>


<style>
  .board {
    display: flex;
    justify-content: center;
  }

  .grid {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    box-sizing: border-box;
  }
  
  .row {
    display: flex;
    align-items: stretch;
  }

  .cell {
    position: relative;
    box-sizing: border-box;
    height: 64px;
    width: 64px;
    border: 1px solid #bbb;
    color:#1d6ae5;
    line-height: 64px;
    font-size: 38px;
  }

  .given { 
    color: black;
  }

  .controls { 
    margin-top: 2rem;
  }

  #svgrenderer {
    z-index: 1;
  }
</style>
