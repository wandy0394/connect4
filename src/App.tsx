import { useState } from 'react'
import './App.css'
import MenuButton from './components/MenuButton'

function App() {

  const [currentPlayer, setCurrentPlayer] = useState<number>(1)

  return (
    <div className='base'>
      <div className='menu-bar'>
        <MenuButton label='MENU' onClick={()=>alert('hello')}/>
        <MenuButton label='RESTART'/>
        <div className="menu-button"></div>
        <div className='icon'>
        
        </div>
      </div>
    </div>
  )
}

export default App
