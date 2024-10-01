import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { test, expect, vi} from 'vitest';
import { BoardGUI } from './boundary';
import { Model } from '../model'
import { config1} from '../configurationInfo'
import Home from  './page'

const model = new Model(config1)

// TODO -- nothing here is failing...
test("nothing sellected", () => {
    const { getByText } = render(<Home />)
	expect(getByText("Syllablast")).toBeTruthy()
    expect(getByText("Reset")).toBeTruthy()
    expect(getByText("Undo")).toBeTruthy()
    expect(getByText("Swap")).toBeTruthy()
    expect(getByText("Config 1")).toBeTruthy()
	expect(getByText("Config 2")).toBeTruthy()
    expect(getByText("Config 3")).toBeTruthy()
    expect(getByText("Number of Moves: 0")).toBeTruthy()
    expect(getByText("Points: 0")).toBeTruthy()

    expect(getByText("in")).toBeTruthy()
    expect(getByText("vis")).toBeTruthy()
})