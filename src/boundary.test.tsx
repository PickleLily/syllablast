import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi} from 'vitest';
import { BoardGUI } from './boundary';
import { Board, Model } from './model'
import { config1, configuration } from './configurationInfo'

const model = new Model(config1)

test("nothing sellected"), () => {
	render(<BoardGUI topmodel={model} redraw={vi.fn()} />);

	expect(model.board.sellectedSyllable1).toBeUndefined()
	expect(model.board.sellectedSyllable2).toBeUndefined()

	expect(model.board.syllables[0][0].inCorrectPosition).toBe(false)

	const syllable1 = screen.getByText('in')
	const syllable2 = screen.getByText('vis')
	const syllable3 = screen.getByText('mac')

	expect(screen.getByText('in')).toBeTruthy()
	expect(screen.getByText('vis')).toBeTruthy()
	expect(screen.getByText('mac')).toBeTruthy()


	fireEvent.click(syllable1)
	expect(model.board.sellectedSyllable1).toBe(syllable1)

	fireEvent.click(syllable2)
	expect(model.board.sellectedSyllable2).toBe(syllable2)

	fireEvent.click(syllable3)
	expect(model.board.sellectedSyllable1).toBe(syllable3)

	fireEvent.click(syllable1)
	expect(model.board.sellectedSyllable2).toBe(syllable3)

	m1.checkCorrectPosition()
	m1.checkCorrectPosition()

	expect(m1)
	const button_in = getByText('syll4') // syll4 is in the correct position
    expect(button).toBeDisabled()
}


// TODO -- NOT running this???
test("button disabled"), () => {
	var c4Words = [["in", "vis", "i", "ble"],
		["im", "mac", "u", "late"],
		["af","fil","i","ate" ],
		["un","der","wa","ter"]]

var c4Initial = [['ter','ate','wa','der'], 
		['fil','u','im','i'], 
		['af','late','mac','un'], 
		['in','vis','i','ble']]

const config4 = new configuration("#1", c4Words, c4Initial)
let m1 = new Model(config4)
	render(<BoardGUI topmodel={m1} redraw={vi.fn()} />);

	const { getByText } = render(<button className="square" disabled={m1.board.syllables[3][0].inCorrectPosition} onClick={() => BoardGUI({m1:0})}> {m1.board.syllables[3][0].syllable} </button>)
	
	const button = getByText('in')

	m1.checkCorrectPosition()
	m1.calculatePoints()

	expect(model.board.syllables[3][0].inCorrectPosition).toBe(true)
	expect(model.points).toBe(4)


	const syllable1 = screen.getByText('in')
	const syllable2 = screen.getByText('vis')
	const syllable3 = screen.getByText('mac')

	expect(screen.getByText('in')).toBeTruthy()
	expect(screen.getByText('vis')).toBeTruthy()
	expect(screen.getByText('mac')).toBeTruthy()


	fireEvent.click(syllable1)
	expect(model.board.sellectedSyllable1).toBe(syllable1)

	expect(m1)
	const button_in = getByText('in') // syll4 is in the correct position
    expect(button_in).toBeDisabled()
}
