import { configuration} from './configurationInfo'


export class Coordinate {
    readonly row : number;
    readonly column : number;

    constructor(row:number, column:number) {
      this.row = row;
      this.column = column;
    }

    getRow(){
        return this.row
    }
    getCol(){
        return this.column
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

    addCoord(coord : Coordinate){
        this.coord = coord
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

    swapSyllables(inputSyllable1 : Syllable, inputSyllable2 : Syllable){
        
        console.log(this.sellectedSyllable1)
        console.log(this.sellectedSyllable2)

        if(this.sellectedSyllable1 != undefined && this.sellectedSyllable2 != undefined){
            var s1 = inputSyllable1.syllable
            var s2 = inputSyllable2.syllable

            var s1coord = inputSyllable1.coord
            var s2coord = inputSyllable2.coord

            this.syllables[s1coord.getRow()][s1coord.getCol()].syllable == s2
            this.syllables[s2coord.getRow()][s2coord.getCol()].syllable == s1
        
            this.addSwap(new Swap(this.sellectedSyllable1, this.sellectedSyllable2))
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
        this.config = config
        this.words = []

        this.board = new Board(config.initialSetup)

        for (let r:number = 0; r < 4; r++) {
            this.words[r] = []
            for (let c:number = 0; c < 4; c++) {
                this.words[r][c] = config.words[r][c]
                this.board.syllables[r][c] = new Syllable(config.initialSetup[r][c], new Coordinate(r,c))
                //this.board.syllables[r][c] = config.initialSetup[r][c]
                //this.board.syllables[r][c].coord = new Coordinate(r,c) 
                
            }
        }
        this.numMoves = 0
        this.numUndos = 0
        this.points = 0
    }

    
    swapSyllables(s1 : Syllable, s2 : Syllable){
        let b = this.board
        if (this.board.sellectedSyllable1 != undefined && this.board.sellectedSyllable2 != undefined){
            b.swapSyllables(this.board.sellectedSyllable1, this.board.sellectedSyllable2)
        }
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
        // for(let r = 0; r < 4; r++){
        //     for(let rword = 0; rword<4; rword++){
        //         if(this.board.syllables[r][0].syllable == this.words[r][0]){
        //             this.board.syllables[r][0].inCorrectPosition = true
        //         }else{
        //             this.board.syllables[r][0].inCorrectPosition = FontFaceSetLoadEvent
        //         }
        //     }
        // }
        return true
    }

    calculatePoints(){
        this.points = this.points + 1
    }
}