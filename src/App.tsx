import { useState } from 'react'
import './App.css'
import MenuButton from './components/MenuButton/MenuButton'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'


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
      <div className='column'>
        <MenuBar/>
      </div>
      <div className='column column-right'>
        <Card color={secondaryColor} title='Player 2' score={1}>
        </Card>
      </div>
    </div>
  )
}

export default App
