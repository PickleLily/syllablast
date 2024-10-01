import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect} from 'vitest';
import { BoardGUI } from './boundary';
import { Model } from './model'
import { config1} from './configurationInfo'

const model = new Model(config1)

test("nothing sellected"), () => {
	expect(model.board.sellectedSyllable1).toBeUndefined()
	expect(model.board.sellectedSyllable2).toBeUndefined()

	const syllable1 = screen.getByText('in')
	const syllable2 = screen.getByText('vis')
	const syllable3 = screen.getByText('mac')


	fireEvent.click(syllable1)
	expect(model.board.sellectedSyllable1).toBe(syllable1)

	fireEvent.click(syllable2)
	expect(model.board.sellectedSyllable2).toBe(syllable2)

	fireEvent.click(syllable3)
	expect(model.board.sellectedSyllable1).toBe(syllable3)

	fireEvent.click(syllable1)
	expect(model.board.sellectedSyllable2).toBe(syllable3)
}

// // describe('BoardGUI', () => {
// //   test('should render the syllables as buttons', () => {
// //     // Render the component
// //     render(<BoardGUI topmodel={mockTopModel} redraw={vi.fn()} />);

// // 	// TODO --  DOES NOT WORK
// // 	    // Check that buttons with the syllable text are rendered
// // 	    expect(screen.getByText('in')).toBeInTheDocument();
// // 	    expect(screen.getByText('vis')).toBeInTheDocument();
// // 	    expect(screen.getByText('i')).toBeInTheDocument();
// // 	    expect(screen.getByText('ble')).toBeInTheDocument();
// // 	  });

//   test('should call the redraw function when a button is clicked', () => {
//     const redrawMock = vi.fn();
//     render(<BoardGUI topmodel={mockTopModel} redraw={redrawMock} />);

//     // Simulate a click on button 'a'
//     const buttonA = screen.getByText('a');
//     fireEvent.click(buttonA);

//     // Check that redraw has been called
//     expect(redrawMock).toHaveBeenCalled();
//   });

//   test('should update the most recently clicked syllable', () => {
//     render(<BoardGUI topmodel={mockTopModel} redraw={vi.fn()} />);

//     const buttonA = screen.getByText('a');
//     const buttonB = screen.getByText('b');

//     // Click button 'a'
//     fireEvent.click(buttonA);
//     expect(mockTopModel.board.sellectedSyllable1).toEqual({ syllable: 'a', inCorrectPosition: false });

//     // Click button 'b'
//     fireEvent.click(buttonB);
//     expect(mockTopModel.board.sellectedSyllable2).toEqual({ syllable: 'b', inCorrectPosition: false });
//   });

//   test('should cycle between sellectedSyllable1 and sellectedSyllable2 on button clicks', () => {
//     render(<BoardGUI topmodel={mockTopModel} redraw={vi.fn()} />);

//     const buttonA = screen.getByText('a');
//     const buttonB = screen.getByText('b');

//     // Click button 'a'
//     fireEvent.click(buttonA);
//     expect(mockTopModel.board.sellectedSyllable1).toEqual({ syllable: 'a', inCorrectPosition: false });

//     // Click button 'b'
//     fireEvent.click(buttonB);
//     expect(mockTopModel.board.sellectedSyllable2).toEqual({ syllable: 'b', inCorrectPosition: false });

//     // Click button 'a' again
//     fireEvent.click(buttonA);
//     expect(mockTopModel.board.sellectedSyllable1).toEqual({ syllable: 'a', inCorrectPosition: false });
//   });
// });