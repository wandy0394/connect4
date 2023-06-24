import { useGameContext } from "../../context/GameContext"
import { GAME_MODE, Player } from "../../feature/gameplay/connect4"
import { PLAYER_COLORS, theme } from "../../theme/theme"
import MenuButton from "../MenuButton/MenuButton"
import Spinner from "../Spinner/Spinner"
import styles from './TurnCard.module.css'

export default function TurnCard() {
    const {currentPlayer, winner, resetGame, isGameOver,  undoMove, getTurnNumber, gameMode, cpuThinking} = useGameContext()
    function setTurnCardColour() {
        if (!isGameOver) return {backgroundColor:PLAYER_COLORS[currentPlayer]}
        return {backgroundColor:PLAYER_COLORS[winner]}
    }
    return (

        <>
        {
          !cpuThinking 
            ? <div className={styles["turn-card"]} style={setTurnCardColour()}>
                {
                  !isGameOver 
                    ? <div className={styles['gameover-card']}>
                        <label className={styles['turn-label']}>PLAYER {currentPlayer}'s TURN</label>
                          {
                            (getTurnNumber() > 1) && gameMode === GAME_MODE.PLAYER_VS_PLAYER &&
                              <MenuButton onClick={undoMove} label='UNDO'/>
                          }
                      </div>
                    : <div className={styles['gameover-card']}>
                        <label className={styles['turn-label']}>
                          {
                            winner !== Player.NONE
                              ? <span>PLAYER {(gameMode === GAME_MODE.PLAYER_VS_CPU && winner === Player.PLAYER2) ? 'CPU' : winner} WINS!</span>
                              : <span>DRAW GAME</span>
                          }
                        </label>
                        <MenuButton label={'PLAY AGAIN'} onClick={()=>resetGame(false)}/>
                      </div>
                }
              </div>
            : <div className={styles["turn-card"]} style={{backgroundColor:theme.secondaryColor}}>
                  <div className={styles['gameover-card']}>
                    <label className={styles['turn-label']}>CPU is Thinking...</label>
                    <div style={{width:'25%'}}>
                      <Spinner/>
                    </div>
                  </div>
              </div>
        }
        </>      

    )
}