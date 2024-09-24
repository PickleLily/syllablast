import { Puzzle } from './puzzle'


export class Coordinate {
    readonly row : number;
    readonly column : number;

    constructor(row:number, column:number) {
      this.row = row;
      this.column = column;
    }
}

export class Syllable{
    syllable : string;
    inCorrectPosition : boolean;

    constructor(s : string){
        this.syllable = s
        this.inCorrectPosition = false;
    }
}

export class Board {
    syllables : string[][]

    constructor() {
        this.syllables = []
        for (let r:number = 0; r < 4; r++) {
            this.syllables[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.syllables[r][c] = ''
            }
        }
    }

}

export class Model {
    words : string[][];
    puzzle : Puzzle;
    board : Board
    numMoves : number;
    numUndos : number;
    points : number;

    constructor(puzzle : Puzzle) {
        //TODO make the words equal to the words provided by the puzzle
        this.puzzle = puzzle
        this.words = []

        let board = new Board()
        for (let r:number = 0; r < 4; r++) {
            this.words[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.words[r][c] = this.puzzle.config.words[r][c]
                board.syllables[r][c] = this.puzzle.config.initialSetup[r][c]
            }
        }
        this.board = board
        this.numMoves = 0
        this.numUndos = 0
        this.points = 0
    }

}