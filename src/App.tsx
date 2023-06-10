import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'
import GameBoard from './components/GameBoard/GameBoard'
import  {COLOR_DICT, Game} from './feature/gameplay/connect4'
import { useGameContext } from './feature/gameplay/GameContext'

const primaryColor = window.getComputedStyle(document.body).getPropertyValue('--primary-color')
const secondaryColor = window.getComputedStyle(document.body).getPropertyValue('--secondary-color')
    

let game = new Game()

function App() {

  const {currentPlayer} = useGameContext()

  return (
    <div className='base'>
      <div className='column column-left'>
        <Card color={primaryColor} title='PLAYER 1' score={0}>
          
        </Card>
      </div>
      <div className='column column-center'>
        <MenuBar/>
        <GameBoard board={game.board}/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className='column column-right'>
        <Card color={secondaryColor} title='PLAYER 2' score={1}>
        </Card>
      </div>
      <div className="turn-card" style={{backgroundColor:COLOR_DICT[currentPlayer]}}>
        <label className='label'>PLAYER {currentPlayer}'s TURN</label>
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
