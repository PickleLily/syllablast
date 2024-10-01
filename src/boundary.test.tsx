import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi} from 'vitest';
import { BoardGUI } from './boundary';
import { Board, Model } from './model'
import { config1, configuration } from './configurationInfo'

const model = new Model(config1)

test("nothing sellected", () => {
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
	if(model.board.sellectedSyllable1!= undefined){
		expect(model.board.sellectedSyllable1.syllable).toBe("in")
	}
	fireEvent.click(syllable2)
	if(model.board.sellectedSyllable2!= undefined){
		expect(model.board.sellectedSyllable2.syllable).toBe("vis")
	}

	fireEvent.click(syllable3)
	if(model.board.sellectedSyllable1!= undefined){
		expect(model.board.sellectedSyllable1.syllable).toBe("mac")
	}

	fireEvent.click(syllable1)
	if(model.board.sellectedSyllable2!= undefined){
		expect(model.board.sellectedSyllable2.syllable).toBe("in")
	}

	model.checkCorrectPosition()
	model.checkCorrectPosition()
})