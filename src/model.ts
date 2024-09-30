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

        if(this.sellectedSyllable1 != undefined && this.sellectedSyllable2 != undefined){
            var s1 = inputSyllable1.syllable
            var s2 = inputSyllable2.syllable

            var s1coord = inputSyllable1.coord
            var s2coord = inputSyllable2.coord

            this.syllables[s1coord.getRow()][s1coord.getCol()].syllable = s2
            this.syllables[s2coord.getRow()][s2coord.getCol()].syllable = s1
        
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
            }
        }
        this.numMoves = 0
        this.numUndos = 0
        this.points = 0
    }

    
    swapSyllables(s1 : Syllable, s2 : Syllable){
        if (this.board.sellectedSyllable1 != undefined && this.board.sellectedSyllable2 != undefined){
            this.board.swapSyllables(this.board.sellectedSyllable1, this.board.sellectedSyllable2)
        }
            this.checkCorrectPosition()
    }

    undoSwap(){
        let b = this.board
        let swaps = b.swaps
        if(this.numMoves != 0){
            b.removeSwap()
            this.decrementMoves()
            this.checkCorrectPosition()
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

    checkCorrectPosition(){
        if(this.board.sellectedSyllable1 == undefined || this.board.sellectedSyllable2 == undefined){
            return
        }else{
            var row1 = this.board.sellectedSyllable1.coord.getRow()
            var row2 = this.board.sellectedSyllable2.coord.getRow()
            for(let r = 0; r < 4; r++){
                for(let c = 1; c < 4; c++){
                    if(this.words[r][c] == this.board.syllables[row1][c].syllable){
                        this.board.syllables[r][c].inCorrectPosition = true
                    }else{
                        return
                    }
                }
            }

            for(let r = 0; r < 4; r++){
                for(let c = 1; c < 4; c++){
                    if(this.words[r][c] == this.board.syllables[row2][c].syllable){
                        this.board.syllables[r][c].inCorrectPosition = true
                    }else{
                        return
                    }
                }
            }
        }
        this.calculatePoints()
    }

    calculatePoints(){
        var count = 0
        for(let r = 0; r < 4; r++){
            for(let c = 0; c < 4; c++){
                if(this.board.syllables[r][c].inCorrectPosition == true){
                    count = count + 1
                }
            }
        }
    }

}