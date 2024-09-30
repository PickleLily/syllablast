'use client'                              // directive to clarify client-side
import React from 'react'
import {useState} from 'react'
import { Model } from './model'

// var mostRecentlyClicked = -1
// var disabled = useState


export function BoardGUI({topmodel, redraw}) {
  const [disabled, setDisabled] = useState(false);  // control for disabled state if needed
  const [mostRecentlyClicked, setMostRecentlyClisked] = useState(-1);  // control for disabled state if needed


    function handleClick(r:number, c:number) {
      if(topmodel.board.sellectedSyllable1 == undefined){
        topmodel.board.sellectedSyllable1 = topmodel.board.syllables[r][c]
        setMostRecentlyClisked(1)

      }else if (topmodel.board.sellectedSyllable2 == undefined){
        topmodel.board.sellectedSyllable2 = topmodel.board.syllables[r][c]
        setMostRecentlyClisked(2)

      }else if(mostRecentlyClicked == 2){
        topmodel.board.sellectedSyllable1 = topmodel.board.syllables[r][c]
        setMostRecentlyClisked(1)

      }else if (mostRecentlyClicked == 1){
        topmodel.board.sellectedSyllable2 = topmodel.board.syllables[r][c]
        setMostRecentlyClisked(2)
      }
      setDisabled(false)
      redraw(redraw + 1)  // call the redraw
    }

    return (
      <>
        <div>
          {topmodel.board.syllables.map((row, rowIndex) => (
            <div key={rowIndex}>
              {row.map((syllable, colIndex) => (
                <button
                  className="square"
                  disabled={false}  // manage disable logic here if needed
                  onClick={() => handleClick(rowIndex, colIndex)}
                >
                  {syllable.syllable}
                </button>
              ))}
            </div>
          ))}
        </div>
      </>
    );
  }

