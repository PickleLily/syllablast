/** Configuration for pre-existing puzzles. */

export class configuration {
	name : string;
	words : string[][];
	initialSetup : string[][];

	constructor(inputName : string , inputWords : string[][], inputInitialSetup : string[][]){
		this.name = inputName
		this.words = []
		this.initialSetup = []

		for (let r:number = 0; r < 4; r++) {
			this.words[r] = []
			this.initialSetup[r] = []

            for (let c:number = 0; c < 4; c++) {
                this.words[r][c] = inputWords[r][c]
				this.initialSetup[r][c] = inputInitialSetup[r][c]
            }
        }
	}
}

var c1Words = [[ "in,vis,i,ble"  ],
[ "im,mac,u,late" ],
[ "af,fil,i,ate"  ],
[ "un,der,wa,ter" ]]

var c1Initial = [['ter','ate','ble','der'], 
['fil','in','im ','i'], 
['i','late','mac','un'], 
['u','vis','af','wa']]
const config1 = new configuration("#1", c1Words, c1Initial)


var c2Words = [[ "ex,am,in,ing"],
[ "re,in,force,ment" ],
[ "in,for,ma,tive"],
[ "ma,te,ri,al" ]]

var c2Initial = [['force','ment','al','in'],
['for','ma','am','in'],
['tive','ma','ing','in'],
['ri','re','te','ex']]

const config2 = new configuration("#2", c2Words, c2Initial)


var c3Words = [[ "me,chan,i,cal"],
[ "cal,cu,lat,ing"],
["im,me,di,ate"],
["di,ag,on,al" ]]

var c3Initial = [['di','im','me','di'],
['cu','cal','cal','me'],
['lat','nal','ing','i'],
['o','ate','ag','chan']]
const config3 = new configuration("#3", c3Words, c3Initial)



export { config1, config2, config3 }

