import { expect, test } from 'vitest'
import { render, fireEvent, cleanup } from '@testing-library/react'

import Home from './app/page'

test('Start@0', async () => {
    const { getByText } = render(<Home />)
    const movesElement = getByText(/Number of Moves: 0/i);
  
    expect(movesElement === undefined).toBe(false)
    cleanup()
  })

  
  test('NoSwapUntil2Selected', async() => {
    const { getByTestId } = render(<Home />);
  
    cleanup()
  });
  