import { configuration, Puzzle } from './puzzle'


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

    constructor(s : string[][]) {
        this.syllables = []
        for (let r:number = 0; r < 4; r++) {
            this.syllables[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.syllables[r][c] = s[r][c]
            }
        }
    }
}

export class Model {
    words : string[][];
    config : configuration;
    board : Board
    numMoves : number;
    numUndos : number;
    points : number;

    constructor(config : configuration) {
        //TODO make the words equal to the words provided by the puzzle
        this.config = config
        this.words = []

        let board = new Board(config.initialSetup)

        for (let r:number = 0; r < 4; r++) {
            this.words[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.words[r][c] = config.words[r][c]
                board.syllables[r][c] = config.initialSetup[r][c]
            }
        }
        this.board = board
        this.numMoves = 0
        this.numUndos = 0
        this.points = 0
    }
}