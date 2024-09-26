'use client'                              // directive to clarify client-side
import React from 'react'

// redraw is a function
export function BoardGUI({topmodel, redraw}) {

    function handleClick(r:number, c:number) {
      console.log("clicked on: ", r, c, redraw)
      let board = topmodel.board
      board.syllables[r][c] = 'x' + board.syllables[r][c] 
      redraw()  // call the redraw
    }
    
    return (
      <>
        <div>
          <button className="square" onClick={() => handleClick(0, 0)}>{topmodel.board.syllables[0][0]}</button>
          <button className="square" onClick={() => handleClick(0, 1)}>{topmodel.board.syllables[0][1]}</button>
          <button className="square" onClick={() => handleClick(0, 2)}>{topmodel.board.syllables[0][2]}</button>
          
          {/* TODO -- only this one is not adding an X...*/}
          <button className="square" onClick={() => handleClick(0, 3)}>{topmodel.board.syllables[0][3]}</button>
        
        </div>
        <div>
          <button className="square" onClick={() => handleClick(1, 0)}>{topmodel.board.syllables[1][0]}</button>
          <button className="square" onClick={() => handleClick(1, 1)}>{topmodel.board.syllables[1][1]}</button>
          <button className="square" onClick={() => handleClick(1, 2)}>{topmodel.board.syllables[1][2]}</button>
          <button className="square" onClick={() => handleClick(1, 3)}>{topmodel.board.syllables[1][3]}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(2, 0)}>{topmodel.board.syllables[2][0]}</button>
          <button className="square" onClick={() => handleClick(2, 1)}>{topmodel.board.syllables[2][1]}</button>
          <button className="square" onClick={() => handleClick(2, 2)}>{topmodel.board.syllables[2][2]}</button>
          <button className="square" onClick={() => handleClick(2, 3)}>{topmodel.board.syllables[2][3]}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(3, 0)}>{topmodel.board.syllables[3][0]}</button>
          <button className="square" onClick={() => handleClick(3, 1)}>{topmodel.board.syllables[3][1]}</button>
          <button className="square" onClick={() => handleClick(3, 2)}>{topmodel.board.syllables[3][2]}</button>
          <button className="square" onClick={() => handleClick(3, 3)}>{topmodel.board.syllables[3][3]}</button>
        </div>
      </>
    )
  }

