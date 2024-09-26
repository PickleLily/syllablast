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

class Swap{
    syllable1 : Syllable;
    syllable2 : Syllable;

    constructor(s1 : Syllable, s2 : Syllable){
        this.syllable1 = s1
        this.syllable2 = s2 
    }
}

export class Board {
    syllables : Syllable[][]
    sellectedSyllable1 : Syllable | undefined
    sellectedSyllable2 : Syllable | undefined
    swaps : Swap[]

    constructor(s : string[][]) {
        this.syllables = []
        this.swaps = []
        this.sellectedSyllable1 = undefined
        this.sellectedSyllable2 = undefined

        for (let r:number = 0; r < 4; r++) {
            this.syllables[r] = []

            for (let c:number = 0; c < 4; c++) {
                this.syllables[r][c] = new Syllable(s[r][c], new Coordinate(r,c))
            }
        }
    }

    addSwap(swap : Swap){this.swaps.push(swap)}

    removeSwap(){this.swaps.pop()}

    swapSyllables(){
        if(this.sellectedSyllable1 != undefined && this.sellectedSyllable2 != undefined){
            var s1 = this.sellectedSyllable1
            var s2 = this.sellectedSyllable2
        
            this.addSwap(new Swap(s1, s2))
        }else{
            return
        }
    }}

export class Model {
    words : string[][];
    config : configuration;
    board : Board
    numMoves : number;
    numUndos : number;
    points : number;

    constructor(config : configuration) {
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
        b.swapSyllables()
        this.calculatePoints()
    }

    undoSwap(){
        let b = this.board
        let swaps = b.swaps
        if(this.numMoves != 0){
            b.removeSwap()
            this.decrementMoves()
            this.calculatePoints()
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

    //TODO --> work this out on paper...
    checkCorrectPosition(){
        for(let r = 0; r < 4; r++){
            for(let rword = 0; rword<4; rword++){
                if(this.board.syllables[r][0].syllable == this.words[r][0]){
                    this.board.syllables[r][0].inCorrectPosition = true
                }else{
                    this.board.syllables[r][0].inCorrectPosition = FontFaceSetLoadEvent
                }
            }
        }
    }

    calculatePoints(){
        var count = 0        
        for(let row = 0; row < 4; row ++){
            for(let col = 0; col < 4; col++){
                if(this.board.syllables[row][col].inCorrectPosition == true){
                    count++
                }
            }
        }
        return count;
    }
}