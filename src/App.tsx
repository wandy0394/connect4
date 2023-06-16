import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'
import GameBoard from './components/GameBoard/GameBoard'
import  {Player} from './feature/gameplay/connect4'
import { useGameContext } from './feature/gameplay/GameContext'
import { theme } from './components/theme/theme'
import TurnCard from './components/TurnCard/TurnCard'



function App() {

  const {score} = useGameContext()


  return (
    <div className='base'>
      <div className='column column-left'>
        <Card color={theme.primaryColor} title='PLAYER 1' score={score[Player.PLAYER1]}/>
      </div>
      <div className='column column-center'>
        <MenuBar/>
        <GameBoard/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className='column column-right'>
        <Card color={theme.secondaryColor} title='PLAYER 2' score={score[Player.PLAYER2]}/>
      </div>
      <TurnCard/>
      <div className="footer"></div>
    </div> 
  )
}

export default App
