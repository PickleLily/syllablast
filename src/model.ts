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
    coord : Coordinate;
    inCorrectPosition : boolean;

    constructor(s : string, coord : Coordinate){
        this.syllable = s
        this.coord = coord
        this.inCorrectPosition = false;
    }
}

export class Board {
    syllables : Syllable[][]
    sellectedSyllable1 : Syllable | undefined
    sellectedSyllable2 : Syllable | undefined

    constructor(s : string[][]) {
        this.syllables = []
        this.sellectedSyllable1 = undefined
        this.sellectedSyllable2 = undefined

        for (let r:number = 0; r < 4; r++) {
            this.syllables[r] = []

            for (let c:number = 0; c < 4; c++) {
                this.syllables[r][c] = new Syllable(s[r][c], new Coordinate(r,c))
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


    swapSyllables(){
        let b = this.board
        if(b.sellectedSyllable1 != undefined && b.sellectedSyllable2 != undefined){
            var s1 = b.sellectedSyllable1
            var s2 = b.sellectedSyllable2
        }else{
            return
        }
    }

    incrementMoves(){
        this.numMoves = this.numMoves + 1
    }

    decrementMoves(){
        if(this.numMoves != 0){
            this.numMoves = this.numMoves - 1
        }
    }
}