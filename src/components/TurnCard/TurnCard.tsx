import { useGameContext } from "../../feature/gameplay/GameContext"
import { COLOR_DICT, Player } from "../../feature/gameplay/connect4"
import MenuButton from "../MenuButton/MenuButton"

export default function TurnCard() {
    const {currentPlayer, winner, resetGame, isGameOver,  undoMove, getTurnNumber} = useGameContext()
    function setTurnCardColour() {
        if (!isGameOver) return {backgroundColor:COLOR_DICT[currentPlayer]}
        return {backgroundColor:COLOR_DICT[winner]}
    }
    return (
        <div className="turn-card" style={setTurnCardColour()}>
        {
          !isGameOver 
            ? <div className='gameover-card'>
                <label className='turn-label'>PLAYER {currentPlayer}'s TURN</label>
                {
                  (getTurnNumber() > 1) &&
                    <MenuButton onClick={undoMove} label='UNDO'/>
                }
              </div>
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
    )
}