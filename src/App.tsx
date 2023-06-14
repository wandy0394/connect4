import './App.css'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'
import GameBoard from './components/GameBoard/GameBoard'
import  {COLOR_DICT, Player} from './feature/gameplay/connect4'
import { useGameContext } from './feature/gameplay/GameContext'
import MenuButton from './components/MenuButton/MenuButton'
import { theme } from './components/theme/theme'



function App() {

  const {currentPlayer, winner, score, resetGame, isGameOver, board} = useGameContext()

  function setTurnCardColour() {
    if (!isGameOver) return {backgroundColor:COLOR_DICT[currentPlayer]}
    return {backgroundColor:COLOR_DICT[winner]}
  }

  return (
    <div className='base'>
      <div className='column column-left'>
        <Card color={theme.primaryColor} title='PLAYER 1' score={score[Player.PLAYER1]}>
          
        </Card>
      </div>
      <div className='column column-center'>
        <MenuBar/>
        <GameBoard board={board}/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className='column column-right'>
        <Card color={theme.secondaryColor} title='PLAYER 2' score={score[Player.PLAYER2]}>
        </Card>
      </div>
      <div className="turn-card" style={setTurnCardColour()}>
        {
          !isGameOver 
            ? <label className='turn-label'>PLAYER {currentPlayer}'s TURN</label>
            : <div className='gameover-card'>
                <label className='turn-label'>
                  {
                    winner !== Player.NONE
                      ? <span>PLAYER {winner} WINS!</span>
                      : <span>DRAW GAME</span>
                  }
                </label>
                <MenuButton label={'PLAY AGAIN'} onClick={()=>resetGame(false)}/>
              </div>
        }
      </div>
      <div className="footer"></div>
    </div>
  )
}

export default App
