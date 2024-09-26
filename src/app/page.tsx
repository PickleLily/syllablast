'use client'                              // directive to clarify client-side
import React from 'react'
import { configuration, config1, config2, config3 } from '../configurationInfo'
import { Model } from '../model'
import { BoardGUI } from '../boundary'
import { realHandle } from '../controllers'

var chosenConfig = config1

export default function Home() {

	var chosenConfig = config1
  
  // initial instantiation of the Model comes from the chosenPuzzle
  const [model, setModel] = React.useState(new Model(chosenConfig))
  const [redraw, setRedraw] = React.useState(0)
  
  function refresh() {
	setRedraw(redraw+1)
  }

  function handleUndo(model: Model){
	model.decrementMoves()
	setRedraw(redraw+1)
  }
  
  function handleSwap(model: Model){
	model.incrementMoves()
	setRedraw(redraw+1)
  }

  return (
	<div className = "items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		<h1 className="title"> Syllablast</h1>

		<BoardGUI topmodel={model} redraw={refresh}/>

		<label className="numMoves">{"Number of Moves: " + model.numMoves}</label>
		{/* <label className="numUndos">{"Undos Used: " + model.numUndos}</label> */}
		<label className="pts">{"Points: " + model.points}</label>

		<button className="button resetButton" onClick={() => setModel(new Model(chosenConfig))}>Reset</button>
		<button className="button undoButton" onClick={() => handleUndo(model)}>Undo</button>
		<button className="button swapButton" onClick={() => handleSwap(model)}>Swap</button>

		<button className="button c1Button" onClick={() => setModel(new Model(config1))}>Config 1</button>
		<button className="button c2Button" onClick={() => setModel(new Model(config2))}>Config 2</button>
		<button className="button c3Button" onClick={() => setModel(new Model(config3))}>Config 3</button>
		
	</div>
  )
}