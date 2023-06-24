import { useState } from 'react'
import { useGameContext } from '../../context/GameContext'
import { GAME_MODE,  Player } from '../../feature/gameplay/connect4'
import styles from './FirstPlayerSelectMenu.module.css'
import useCPUFirstMove from '../../hooks/useCPUFirstMove'

type Props = {
    handleClose: () => void
    handleBack: () => void
    gameMode: GAME_MODE
}

export default function FirstPlayerSelectMenu(props:Props) {
    const {handleClose, handleBack, gameMode} = props
    const {setGameMode, resetGame} = useGameContext()
    const [_, setStartCPUMove] = useCPUFirstMove({callback:handleClose})
    const [firstPlayer, setFirstPlayer] = useState<Player>(Player.PLAYER1)

    function handleStartClick() {
        setGameMode(gameMode)
        if (gameMode === GAME_MODE.PLAYER_VS_CPU) {
            //in a CPU game, the current player is always player1
            resetGame(true, Player.PLAYER1)
            if (firstPlayer === Player.PLAYER1) {
                handleClose()
            }
            else {
                setStartCPUMove(true)
                //check use effect for the CPUs first move and closing of the modal
            }
        }
        else if (gameMode === GAME_MODE.PLAYER_VS_PLAYER) {
            resetGame(true, firstPlayer)
            handleClose()
        }
    }

    return (
        <div className={styles['container']}>
            <div className={`${styles['title-bar']}`}>
                WHO SHOULD GO FIRST?
            </div>
            <div className={styles['player-card-container']}>
                <div 
                    className={`${styles['player-card']} ${styles['primary-color']}`}
                    onClick={()=>setFirstPlayer(Player.PLAYER1)}
                    style={{
                        fontWeight:firstPlayer===Player.PLAYER1?'bold':'normal',
                    }}
                >
                    PLAYER 1
                </div>
                <div 
                    className={`${styles['player-card']} ${styles['secondary-color']}`}
                    onClick={()=>setFirstPlayer(Player.PLAYER2)}
                    style={{
                        fontWeight:firstPlayer===Player.PLAYER2?'bold':'normal',
                    }}
                >
                    {
                        gameMode === GAME_MODE.PLAYER_VS_CPU?'CPU':'PLAYER 2'
                    }
                </div>
            </div>
            <div className={styles['button-container']}>
                <div className={`${styles['button']}`} onClick={handleBack}>
                    BACK
                </div>
                <div className={`${styles['button']}`} onClick={handleStartClick}>
                    START
                </div>
            </div>
        </div>
    )
}