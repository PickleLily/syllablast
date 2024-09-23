'use client'                              // directive to clarify client-side
import React from 'react'

import { config1, config2, config3 } from '../puzzle'
import { Model } from '../model'
import { BoardGUI } from '../boundary'
import { realHandle } from '../controllers'

var chosenPuzzle = config1

export default function Home() {
  
  // initial instantiation of the Model comes from the chosenPuzzle
  const [model, setModel] = React.useState(new Model(chosenPuzzle))
  const [redraw, setRedraw] = React.useState(0)
  
  function refresh() {
	setRedraw(redraw+1)
  }

  function handleReset() {
	realHandle(model, refresh)
  }

//   // TODO -- implement undo method 
//   function configOne(){
//     const [model, setModel] = React.useState(new Model(config1))
//     realHandle(model, refresh)
//   }

//   // TODO -- implement swap method
//   function configTwo(){
//     const [model, setModel] = React.useState(new Model(config2))
//     realHandle(model, refresh)
//   }

//     // TODO -- implement undo method 
// function configThree(){
//   const [model, setModel] = React.useState(new Model(config3))
//   realHandle(model, refresh)
// }

//   // TODO -- implement undo method 
//   function handleUndo(){
//     realHandle(model, refresh)
//   }

//   // TODO -- implement swap method
//   function handleSwap(){
//     realHandle(model, refresh)
//   }


  return (
	<div className = "items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
		<h1 className="title"> Syllablast</h1>

		<BoardGUI topmodel={model} redraw={refresh}/>

		<label className="numMoves">{"Number of Moves: " + model.numMoves}</label>
		<label className="numUndos">{"Undos Used: " + model.numUndos}</label>
		<label className="pts">{"Points: " + model.points}</label>

		<button className="button resetButton">Reset</button>
		<button className="button undoButton">Undo</button>
		<button className="button swapButton">Swap</button>
		
    	<button className="button c1Button">Config 1</button>
		<button className="button c2Button">Config 2</button>
		<button className="button c3Button">Config 3</button>

		{/* <button className="simpleButton" onClick={() => handleReset()}>reset</button>
		<button className="simpleButton" onClick={() => handleUndo()}>undo</button>
		<button className="simpleButton" onClick={() => handleSwap()}>swap</button>
    	<button className="simpleButton" onClick={() => configOne()}>Config 1</button>
		<button className="simpleButton" onClick={() => configTwo()}>Config 2</button>
		<button className="simpleButton" onClick={() => config() }>Config 1</button> */}
	</div>
  )
}

//    <button className="undoButton" onClick={() => handleUndo()}>undo</button>
//<div>
//    </div>
//       <button className="swapButton" onClick={() => handleSwap()}>swap</button>
//         </div>
//    <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//            <button className="chooseConfig1Button" onClick={() => handleConfig1()}>reset</button>
//        </div>
//              <div className="items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//              <button className="chooseConfig2Button" onClick={() => handleConfig2()}>undo</button>
//        </div>
//        <div>        <button className="chooseConfig3Button" onClick={() => handleConfig3() }>swap</button>
//</div>