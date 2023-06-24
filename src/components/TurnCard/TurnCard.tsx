import { useGameContext } from "../../context/GameContext"
import { GAME_MODE,  Player } from "../../feature/gameplay/connect4"
import { PLAYER_COLORS, theme } from "../../theme/theme"
import MenuButton from "../MenuButton/MenuButton"
import Spinner from "../Spinner/Spinner"
import styles from './TurnCard.module.css'
import useCPUFirstMove from "../../hooks/useCPUFirstMove"

export default function TurnCard() {
    const {currentPlayer, winner, resetGame, isGameOver,  undoMove, getTurnNumber, gameMode, cpuThinking} = useGameContext()
    function setTurnCardColour() {
        if (!isGameOver) return {backgroundColor:PLAYER_COLORS[currentPlayer]}
        return {backgroundColor:PLAYER_COLORS[winner]}
    }
    const [_, setStartCPUMove] = useCPUFirstMove({})


    function handlePvCReset() {
      if (winner === Player.PLAYER1) {
        setStartCPUMove(true)
      }
      resetGame(false, Player.PLAYER1)
    }


    if (gameMode === GAME_MODE.PLAYER_VS_CPU) return (
      <>
      {

        !isGameOver 
          ?<>
              {
                !cpuThinking
                ? <div 
                    className={styles["turn-card"]} 
                    style={{backgroundColor:theme.primaryColor}}
                  > 
                    <div className={styles['gameover-card']}>
                      <label className={styles['turn-label']}>PLAYER {currentPlayer}'s TURN</label>
                    </div>
                  </div>
                : <div 
                    className={styles["turn-card"]} 
                    style={{backgroundColor:theme.secondaryColor}}
                  > 
                    <div className={styles['gameover-card']}>
                      <label className={styles['turn-label']}>CPU is Thinking...</label>
                      <div style={{width:'25%'}}>
                        <Spinner/>
                      </div>
                    </div>
                  </div>
              }
            </>
          : <div 
              className={styles["turn-card"]} 
              style={{backgroundColor:winner === Player.PLAYER1 ? theme.primaryColor:theme.secondaryColor}}
            > 
              <div className={styles['gameover-card']}>
                <label className={styles['turn-label']}>
                  {
                    winner !== Player.NONE
                      ? <span>PLAYER {winner === Player.PLAYER1 ? Player.PLAYER1:'CPU'} WINS!</span>
                      : <span>DRAW GAME</span>
                  }
                </label>
                <MenuButton label={'PLAY AGAIN'} onClick={handlePvCReset}/>
              </div>
            </div>
      }
      </>
    )

    return (
   
        <div className={styles["turn-card"]} style={setTurnCardColour()}>
            {
              !isGameOver 
                ? <div className={styles['gameover-card']}>
                    <label className={styles['turn-label']}>PLAYER {currentPlayer}'s TURN</label>
                      {
                        (getTurnNumber() > 1) &&
                          <MenuButton onClick={undoMove} label='UNDO'/>
                      }
                  </div>
                : <div className={styles['gameover-card']}>
                    <label className={styles['turn-label']}>
                      {
                        winner !== Player.NONE
                          ? <span>PLAYER {winner} WINS!</span>
                          : <span>DRAW GAME</span>
                      }
                    </label>
                    <MenuButton label={'PLAY AGAIN'} onClick={()=>resetGame(false, winner===Player.PLAYER1?Player.PLAYER2:Player.PLAYER1)}/>
                  </div>
            }
          </div>
  )
}