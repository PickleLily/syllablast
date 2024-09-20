export class Coordinate {
    readonly row : number;
    readonly column : number;

    constructor(row:number, column:number) {
      this.row = row;
      this.column = column;
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
    words : string[]
    board : Board

    constructor(puzzle) {

        this.words = [ "in,vis,i,ble" , "im,mac,u,late", "af,fil,i,ate", "un,der,wa,ter" ]

        let board = new Board()
        for (let r:number = 0; r < 4; r++) {
            for (let c:number = 0; c < 4; c++) {
                board.syllables[r][c] = puzzle.initial[r][c]
            }
        }
        this.board = board
    }

}