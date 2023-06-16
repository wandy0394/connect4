import styles from './App.module.css'
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
    <div className={styles['base']}>
      <div className={`${styles['column']} ${styles['column-left']}`}>
        <Card color={theme.primaryColor} title='PLAYER 1' score={score[Player.PLAYER1]}/>
      </div>
      <div className={`${styles['column']} ${styles['column-center']}`}>
        <MenuBar/>
        <GameBoard/>
        {/* Empty Div added to center gameboard */}
        <div style={{height:'10vh'}}></div>
      </div>
      <div className={`${styles['column']} ${styles['column-right']}`}>
        <Card color={theme.secondaryColor} title='PLAYER 2' score={score[Player.PLAYER2]}/>
      </div>
      <TurnCard/>
      <div className={styles["footer"]}></div>
    </div> 
  )
}

export default App
