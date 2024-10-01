import { V } from 'vitest/dist/chunks/reporters.WnPwkmgA.js';
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

    setInCorrectPosition(value : boolean){
        this.inCorrectPosition = value
    }
}

export class Swap{
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


    removeSwap(){
        var swap = this.swaps.pop()
        if(swap != undefined){        
            var saveS1 = swap.syllable1.syllable
            var saveS2 = swap.syllable2.syllable
    
            let syllable1 = this.syllables[swap.syllable1.coord.getRow()][swap.syllable1.coord.getCol()].syllable
            let syllable2 = this.syllables[swap.syllable2.coord.getRow()][swap.syllable2.coord.getCol()].syllable
               
            console.log("pre-Swap s1: " + syllable1 + "   s2: " + syllable2)
    
            this.syllables[swap.syllable1.coord.getRow()][swap.syllable1.coord.getCol()].syllable = saveS2
            this.syllables[swap.syllable2.coord.getRow()][swap.syllable2.coord.getCol()].syllable = saveS1
           console.log("post-Swap s1: " + syllable1 + "   s2: " + syllable2)
        }
    }

    swapSyllables(){
        if(this.sellectedSyllable1 != undefined && this.sellectedSyllable2 != undefined){
            var s1 = this.sellectedSyllable1.syllable
            var s2 = this.sellectedSyllable2.syllable

            var s1coord = this.sellectedSyllable1.coord
            var s2coord = this.sellectedSyllable2.coord

            this.syllables[s1coord.getRow()][s1coord.getCol()].syllable = s2
            this.syllables[s2coord.getRow()][s2coord.getCol()].syllable = s1
        }else{
            return false
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

    swapSyllables(){
        if (this.board.sellectedSyllable1 != undefined && this.board.sellectedSyllable2 != undefined){
            this.board.swapSyllables()
            this.board.addSwap(new Swap(this.board.sellectedSyllable1, this.board.sellectedSyllable2))
        }
            this.checkCorrectPosition()
    }


    undoSwap(){
        if(this.points != 16){
            if(this.board.swaps.length > 0){
                this.board.removeSwap()
                this.decrementMoves()
                this.checkCorrectPosition()
            }
        }
        return false
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
        let b = this.board.syllables
        for(let r = 0; r < 4; r++){
            for(let c = 0; c < 4; c++){
                this.board.syllables[r][c].setInCorrectPosition(false)
            }
        }

        for(let boardRow = 0; boardRow < 4; boardRow ++){
            for(let solutionsRow = 0; solutionsRow < 4; solutionsRow ++){
                if(b[boardRow][0].syllable === this.words[solutionsRow][0]){

                    for(let column = 0; column < 4; column ++){
                        if(b[boardRow][column].syllable === this.words[solutionsRow][column]){
                            b[boardRow][column].setInCorrectPosition(true)
                        }else{
                            column = 5
                        }
                    }
                }
            }
        }
        return this.calculatePoints()
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
        this.points = count
        return this.points
    }

    congratulationsMessage(){
        alert("Congratulations!")
    }
}