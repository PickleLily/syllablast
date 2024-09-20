'use client'                              // directive to clarify client-side
import React from 'react'

import { config1, config2, config3 } from '../puzzle'
import { Model } from '../model'
import { BoardGUI } from '../boundary'
import { realHandle } from '../controllers'

var actualPuzzle = config1


export default function Home() {
  // initial instantiation of the Model comes from the actualPuzzle
  const [model, setModel] = React.useState(new Model(actualPuzzle))
  const [redraw, setRedraw] = React.useState(0)

  function refresh() {
    setRedraw(redraw+1)
  }

  function handleReset() {
    realHandle(model, refresh)
  }

  return (
    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <BoardGUI topmodel={model} redraw={refresh}/>
      <button className="resetButton" onClick={() => handleReset()}>reset</button>
    </div>
  )
}
