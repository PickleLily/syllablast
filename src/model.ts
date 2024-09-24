import { configuration } from "./puzzle";

export class Coordinate {
    readonly row : number;
    readonly column : number;

    constructor(row:number, column:number) {
      this.row = row;
      this.column = column;
    }
}

export class Word{
    syllables : Syllable[];

    constructor(s : Syllable[]){
        this.syllables = []
        for (let r:number = 0; r < 4; r++){
            this.syllables[r] = s[r]
        }
    }
}

export class Syllable{
    syllable : string;

    constructor(syllable : string){
        this.syllable = syllable
    }

}

export class Board {
    syllables : string[][];
    config : configuration;
    selectedSyllables : Syllable[];

    constructor(configX: configuration) {
        this.config = configX
        this.syllables = []
        for (let r:number = 0; r < 4; r++) {
            this.syllables[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.syllables[r][c] = configX.initialSetup[r][c]
            }
        }
        this.selectedSyllables = []
    }

}

export class Model {
    //words : string[][]
    board : Board
    numMoves : number;
    numUndos : number;
    points : number;

    constructor(b : Board, w : string[][]) {
        //the board should already be configured??
        //this.words = []

        for(let r:number = 0; r < 4; r++){
            //this.words[r] = []
            for(let c:number =0; c < 4; c++){
                //this.words[r][c] = b.config.words[r][c]
            }
        }
        this.board = b
        this.numMoves = 0
        this.numUndos = 0
        this.points = 0
    }
}