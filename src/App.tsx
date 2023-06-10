import { useState } from 'react'
import './App.css'
import MenuButton from './components/MenuButton/MenuButton'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'
import GameBoard from './components/GameBoard/GameBoard'


const primaryColor = window.getComputedStyle(document.body).getPropertyValue('--primary-color')
const secondaryColor = window.getComputedStyle(document.body).getPropertyValue('--secondary-color')
    
const INIT_BOARD:number[][] = [
  new Array(7).fill(0),
  new Array(7).fill(0),
  new Array(7).fill(0),
  new Array(7).fill(0),
  new Array(7).fill(0),
  new Array(7).fill(0),
]

function App() {

  const [currentPlayer, setCurrentPlayer] = useState<number>(1)

  const [board, setBoard] = useState<number[][]>(INIT_BOARD)

  return (
    <div className='base'>
      <div className='column column-left'>
        <Card color={primaryColor} title='PLAYER 1' score={0}>
          
        </Card>
      </div>
      <div className='column column-center'>
        <MenuBar/>
        <GameBoard board={board}/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className='column column-right'>
        <Card color={secondaryColor} title='PLAYER 2' score={1}>
        </Card>
      </div>
      <div className="turn-card">
        <label>PLAYER {currentPlayer}'s TURN</label>
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
