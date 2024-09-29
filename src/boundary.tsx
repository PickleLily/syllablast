'use client'                              // directive to clarify client-side
import React from 'react'
import { Model } from './model'

var mostRecentlyClicked = -1

export function BoardGUI({topmodel, redraw}) {

    function handleClick(r:number, c:number) {
      console.log("clicked on: ", r, c, redraw)
      topmodel.board.syllables[r][c] = "x" + topmodel.board.syllables[r][c] 

      if(topmodel.board.sellectedSyllable1 == undefined){
        topmodel.board.sellectedSyllable1 = topmodel.board.syllables[r][c]
        mostRecentlyClicked = 1

      }else if (topmodel.board.sellectedSyllable2 == undefined){
        topmodel.board.sellectedSyllable2 = topmodel.board.syllables[r][c]
        mostRecentlyClicked = 2

      }else if(mostRecentlyClicked == 2){
        topmodel.board.sellectedSyllable1 = topmodel.board.syllables[r][c]
        mostRecentlyClicked = 1

      }else if (mostRecentlyClicked == 1){
        topmodel.board.sellectedSyllable2 = topmodel.board.syllables[r][c]
        mostRecentlyClicked = 2
      }

      redraw(redraw + 1)  // call the redraw
    }
    
    return (
      <>
        <div>
          <button className="square" onClick={() => handleClick(0, 0)}>{topmodel.board.syllables[0][0].syllable}</button>
          <button className="square" onClick={() => handleClick(0, 1)}>{topmodel.board.syllables[0][1].syllable}</button>
          <button className="square" onClick={() => handleClick(0, 2)}>{topmodel.board.syllables[0][2].syllable}</button>
          
          {/* TODO -- only this one is not adding an X...
          NOT REGISTERINGIT EVEN AS A BUTTON?? --> when ther is two it works if i click the most right one first THEN the one in the normal position...
          */}
          <button className="square" onClick={() => handleClick(0, 3)}>{topmodel.board.syllables[0][3].syllable}</button>        
        </div>
        <div>
          <button className="square" onClick={() => handleClick(1, 0)}>{topmodel.board.syllables[1][0].syllable}</button>
          <button className="square" onClick={() => handleClick(1, 1)}>{topmodel.board.syllables[1][1].syllable}</button>
          <button className="square" onClick={() => handleClick(1, 2)}>{topmodel.board.syllables[1][2].syllable}</button>
          <button className="square" onClick={() => handleClick(1, 3)}>{topmodel.board.syllables[1][3].syllable}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(2, 0)}>{topmodel.board.syllables[2][0].syllable}</button>
          <button className="square" onClick={() => handleClick(2, 1)}>{topmodel.board.syllables[2][1].syllable}</button>
          <button className="square" onClick={() => handleClick(2, 2)}>{topmodel.board.syllables[2][2].syllable}</button>
          <button className="square" onClick={() => handleClick(2, 3)}>{topmodel.board.syllables[2][3].syllable}</button>
        </div>
        <div>
          <button className="square" onClick={() => handleClick(3, 0)}>{topmodel.board.syllables[3][0].syllable}</button>
          <button className="square" onClick={() => handleClick(3, 1)}>{topmodel.board.syllables[3][1].syllable}</button>
          <button className="square" onClick={() => handleClick(3, 2)}>{topmodel.board.syllables[3][2].syllable}</button>
          <button className="square" onClick={() => handleClick(3, 3)}>{topmodel.board.syllables[3][3].syllable}</button>
        </div>
      </>
    )
  }

