async function solveSudoku(sudoku) {
    let iterations = 0;

    let available = {
        row: [],
        col: [],
        box: []
    };

    for (let i = 0; i < 9; i++) {
        const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        available.row.push(new Set(allNumbers));
        available.col.push(new Set(allNumbers));
        available.box.push(new Set(allNumbers));
    }

    function canPlaceDigit(digit, x, y) {
        return available.row[y].has(digit) && 
        available.col[x].has(digit) &&
        available.box[getBox(x, y)].has(digit); 
    }

    function placeDigit(digit, x, y) {
        available.row[y].delete(digit);
        available.col[x].delete(digit);
        available.box[getBox(x, y)].delete(digit);
        sudoku[y][x] = digit;
    }

    function removeDigit(digit, x, y) {
        available.row[y].add(digit);
        available.col[x].add(digit);
        available.box[getBox(x, y)].add(digit);
        sudoku[y][x] = null;
    }
    

    for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
            if (sudoku[y][x] !== null) {
                placeDigit(sudoku[y][x], x, y);
            }
        }
    }

    function backtrack(x, y) {
        iterations++;

        if (y >= 9) return true;

        const next = getNext(x, y);

        if (sudoku[y][x] !== null) {
            return backtrack(next.x, next.y);
        }

        for (let digit = 1; digit <= 9; digit++) {
            if (canPlaceDigit(digit, x, y)) {
                placeDigit(digit, x, y);
                
                if (backtrack(next.x, next.y)) {
                    return true;
                } else {
                    removeDigit(digit, x, y);
                }
            }
        }

        return false;
    }

    let result = backtrack(0, 0);
    
    console.log("Solved: " + result + "\nIterations: " + iterations);
}

function getBox(x, y) {
    return 3 * Math.floor(y / 3) + Math.floor(x / 3)
}

function getNext(x, y) {
    return x < 8 
    ? { x: x + 1, y } 
    : { x: 0, y: y + 1} 
}

// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
//   }


export { solveSudoku }