import { expect, test } from 'vitest'
import { Coordinate, Syllable, Model, Swap, Board } from './model.ts'
import { config1, configuration } from './configurationInfo.js'

test('Coordinate', () => {
	let c1 = new Coordinate(3, 4)
	expect(c1.row).toBe(3)
	expect(c1.column).toBe(4)
	})

test('SyllableInfo', () => {
	let s1 = new Syllable("im", new Coordinate(1,2))

	expect(s1.inCorrectPosition).toBe(false)
	expect(s1.coord.getRow()).toBe(1)
	expect(s1.coord.getCol()).toBe(2)

	expect(s1.syllable).toBe("im")
})

test('Model', () => {
	let m = new Model(config1)

	expect(m.numMoves).toBe(0)
	expect(m.numUndos).toBe(0)
	expect(m.points).toBe(0)

	// use 'toStrictEqual' when object structure is to be compared, and not just ==
	expect(m.board.sellectedSyllable1).toBe(undefined)
	expect(m.board.sellectedSyllable2).toBe(undefined)

	//TODO -- select them and then check that they are NOT undefined...

})

test('incorrectPosition', () => {
	let m = new Model(config1)

	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			expect(m.board.syllables[r][c].inCorrectPosition).toBe(false)
		}	
	}

	expect(m.checkCorrectPosition()).toBe(0)

	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			expect(m.board.syllables[r][c].inCorrectPosition).toBe(false)
		}	
	}
 
	var c4Words = [["in", "vis", "i", "ble"],
			["im", "mac", "u", "late"],
			["af","fil","i","ate" ],
			["un","der","wa","ter"]]

	var c4Initial = [['ter','ate','ble','der'], 
			['fil','u','im','i'], 
			['i','late','mac','un'], 
			['in','vis','af','wa']]
	const config4 = new configuration("#1", c4Words, c4Initial)
	let m1 = new Model(config4)

	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			expect(m1.board.syllables[r][c].inCorrectPosition).toBe(false)
		}	
	}

	expect(m1.checkCorrectPosition()).toBe(2)

	for(let r = 0; r < 4; r++){
		for(let c = 0; c < 4; c++){
			if(r == 3 && c == 0 || r == 3 && c == 1){
				expect(m1.board.syllables[r][c].inCorrectPosition).toBe(true)
			}else{
				expect(m1.board.syllables[r][c].inCorrectPosition).toBe(false)
			}
		}	
	}
})

test('addCoordinate()', () => {
	var sillyball = new Syllable("hell", new Coordinate(0,0))

	expect(sillyball.coord.column).toBe(0)
	expect(sillyball.coord.row).toBe(0)
	expect(sillyball.inCorrectPosition).toBe(false)

	sillyball.addCoord(new Coordinate(1,1))
	sillyball.setInCorrectPosition(true)

	expect(sillyball.coord.column).toBe(1)
	expect(sillyball.coord.row).toBe(1)
	expect(sillyball.inCorrectPosition).toBe(true)
})


test('removeSwap', () => {
})

test('board.swapSyllables', () => {
	let m = new Model(config1)
	let b = m.board
	expect(b.swapSyllables()).toBe(false)

	b.sellectedSyllable1 = new Syllable("hell", new Coordinate(0,1))
	b.sellectedSyllable2 = new Syllable("o", new Coordinate(0,0))

	expect(b.sellectedSyllable1).toStrictEqual(new Syllable("hell", new Coordinate(0,1)))
	expect(b.sellectedSyllable2).toStrictEqual(new Syllable("o", new Coordinate(0,0)))
})

test('add&removeSwap', () => {
	let m = new Model(config1)
	expect(m.board.swaps.length).toBe(0)

	var s1 = new Syllable("hell", new Coordinate(0,1))
	var s2 = new Syllable("o", new Coordinate(0,0))
	var swap1 = new Swap(s1, s2)

	m.board.addSwap(swap1)
	expect(m.board.swaps.length).toBe(1)

	m.board.removeSwap()
	expect(m.board.swaps.length).toBe(0)


})

test('increment&decrementMoves',() =>{
	let m = new Model(config1)
	expect(m.numMoves).toBe(0)
	m.incrementMoves()
	expect(m.numMoves).toBe(1)
	m.decrementMoves()
	expect(m.numMoves).toBe(0)


})

// //151 - 163
// test('undoSwap', () => {
// 	var c4Words = [["in", "vis", "i", "ble"],
// 	["im", "mac", "u", "late"],
// 	["af","fil","i","ate" ],
// 	["un","der","wa","ter"]]

// var c4Initial = [["in", "vis", "i", "ble"],
// 	["im", "mac", "u", "late"],
// 	["af","fil","i","ate" ],
// 	["un","der","wa","ter"]]

// 	let m = new Model(new configuration("#1", c4Words, c4Initial))
	
// 	m.checkCorrectPosition()
// 	expect(m.calculatePoints()).toBe(16)


// 	let m1 = new Model(config1)
// 	expect(m.board.swaps.length).toBe(0)
// 	//TODO -- fix
// 	let s1 = new Syllable("hell", new Coordinate(0,1))
// 	let s2 = new Syllable("o", new Coordinate(0,0))
// 	let swap1 = new Swap(s1, s2)

// 	m.swapSyllables(s1, s2)

// 	expect(m.board.swaps.length).toBe(1)
// })

//143 - 148
test('model.swapSyllables()', () => {
	let m = new Model(config1)
	m.board.sellectedSyllable1 = new Syllable("hell", new Coordinate(0,1))
	m.board.sellectedSyllable2 = new Syllable("o", new Coordinate(0,0))
	m.swapSyllables()
})