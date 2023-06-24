import styles from './App.module.css'
import MenuBar from './components/MenuBar/MenuBar'
import Card from './components/Card/Card'
import GameBoard from './components/GameBoard/GameBoard'
import  {GAME_MODE, Player} from './feature/gameplay/connect4'
import { useGameContext } from './context/GameContext'
import { theme } from './theme/theme'
import TurnCard from './components/TurnCard/TurnCard'



function App() {
  const {score, gameMode} = useGameContext()
  return (
    <div className={styles['base']}>
      <div className={`${styles['column']} ${styles['column-left']}`}>
        <Card color={theme.primaryColor} title='PLAYER 1' score={score[Player.PLAYER1]}/>
      </div>
      <div className={`${styles['column']} ${styles['column-center']}`}>
        <MenuBar/>
        <div className={styles['cards']}>
          <Card color={theme.primaryColor} title='PLAYER 1' score={score[Player.PLAYER1]}/>
          <Card flipped={true} color={theme.secondaryColor} title={gameMode === GAME_MODE.PLAYER_VS_PLAYER?'PLAYER 2':'CPU'} score={score[Player.PLAYER2]}/>
        </div>
        <GameBoard/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className={`${styles['column']} ${styles['column-right']}`}>
        <Card color={theme.secondaryColor} title={gameMode === GAME_MODE.PLAYER_VS_PLAYER?'PLAYER 2':'CPU'} score={score[Player.PLAYER2]}/>
      </div>
      <TurnCard/>
      <div className={styles["footer"]}></div>
    </div> 
  )
}

export default App
