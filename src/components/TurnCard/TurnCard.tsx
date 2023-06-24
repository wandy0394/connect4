import { useState } from "react"
import { useGameContext } from "../../context/GameContext"
import { GAME_MODE, Player } from "../../feature/gameplay/connect4"
import { PLAYER_COLORS } from "../../theme/theme"
import MenuButton from "../MenuButton/MenuButton"
import styles from './TurnCard.module.css'

export default function TurnCard() {
    const {currentPlayer, winner, resetGame, isGameOver,  undoMove, getTurnNumber, gameMode} = useGameContext()
    function setTurnCardColour() {
        if (!isGameOver) return {backgroundColor:PLAYER_COLORS[currentPlayer]}
        return {backgroundColor:PLAYER_COLORS[winner]}
    }


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
                      ? <span>PLAYER {(gameMode === GAME_MODE.PLAYER_VS_CPU && winner === Player.PLAYER2) ? 'CPU' : winner} WINS!</span>
                      : <span>DRAW GAME</span>
                  }
                </label>
                <MenuButton label={'PLAY AGAIN'} onClick={()=>resetGame(false)}/>
              </div>
        }
      </div>
    )
}