import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi} from 'vitest';
import { BoardGUI } from './boundary';
import { Model } from '../model'
import { config1} from '../configurationInfo'
import Home from  './page'

const model = new Model(config1)

// TODO -- nothing here is failing...
test("nothing sellected"), () => {
    const { getByText } = render(<Home />)
	expect(getByText("Syllablast")).toBeTruthy()
    expect(getByText("Reset")).toBeFalsy()
    expect(getByText("Undo")).toBeTruthy()
    expect(getByText("Swap")).toBeTruthy()
    expect(getByText("Config 1")).toBeTruthy()
	expect(getByText("Config 2")).toBeTruthy()
    expect(getByText("Config 3")).toBeTruthy()
    expect(getByText("Number of Moves: 0")).toBeTruthy()
    expect(getByText("Points: 0")).toBeTruthy()

    expect(getByText("in")).toBeTruthy()
    expect(getByText("vis")).toBeTruthy()
    expect(getByText("i")).toBeTruthy()
    expect(getByText("ble")).toBeTruthy()

    expect(getByText("di")).toBeFalsy()
    expect(getByText("ag")).toBeFalsy()
    expect(getByText("on")).toBeFalsy()
    expect(getByText("al")).toBeFalsy()

    fireEvent.click(getByText('Config 3'))

    expect(getByText("di")).toBeTruthy()
    expect(getByText("ag")).toBeTruthy()
    expect(getByText("o")).toBeTruthy()
    expect(getByText("nal")).toBeTruthy()

    //TODO -- SHOULD BE FAILING
    expect(getByText("in")).toBeTruthy()
    expect(getByText("vis")).toBeTruthy()
    expect(getByText("i")).toBeTruthy()
    expect(getByText("ble")).toBeTruthy()

    fireEvent.click(getByText('di'))

    fireEvent.click(getByText('al'))

    fireEvent.click(getByText('Swap'))

    expect(getByText('Number of Points : 1')).toBeTruthy()
    expect(model.points).toBe(1)
    expect(model.calculatePoints()).toBe(1)

    expect(model.incrementMoves()).toBeCalled()
    expect(model.swapSyllables()).toBeCalled()
    expect(model.checkCorrectPosition()).toBeCalled()
    expect(model.calculatePoints()).toBeCalled()



}