import { useState } from 'react'
import './App.css'
import MenuButton from './components/MenuButton/MenuButton'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'
import GameBoard from './components/GameBoard/GameBoard'


const primaryColor = window.getComputedStyle(document.body).getPropertyValue('--primary-color')
const secondaryColor = window.getComputedStyle(document.body).getPropertyValue('--secondary-color')
    
function App() {

  const [currentPlayer, setCurrentPlayer] = useState<number>(1)

  return (
    <div className='base'>
      <div className='column column-left'>
        <Card color={primaryColor} title='Player 1' score={0}>
          
        </Card>
      </div>
      <div className='column column-center'>
        <MenuBar/>
        <GameBoard/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className='column column-right'>
        <Card color={secondaryColor} title='Player 2' score={1}>
        </Card>
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
