import { useEffect, useState } from 'react'
import { useGameContext } from '../../context/GameContext'
import { GAME_MODE, INIT_BOARD, Player } from '../../feature/gameplay/connect4'
import { theme } from '../../theme/theme'
import styles from './FirstPlayerSelectMenu.module.css'

type Props = {
    handleClose: () => void
    handleBack: () => void
    gameMode: GAME_MODE
}

export default function FirstPlayerSelectMenu(props:Props) {
    const {handleClose, handleBack, gameMode} = props
    const {setGameMode, resetGame, CPUMove, setCpuThinking, isPVCInitialised, board, cpuThinking, isGameOver, winner} = useGameContext()
    const [firstPlayer, setFirstPlayer] = useState<Player>(Player.PLAYER1)
    const [startCPUMove, setStartCPUMove] = useState<boolean>(false)

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

    useEffect(()=>{
        //when the CPU is starting to make its first move, check the board is properly initialised
        if (isPVCInitialised(board, cpuThinking, isGameOver, winner) && startCPUMove) {
            setCpuThinking(true)
            function makeCPUMove() {
                CPUMove(INIT_BOARD, true)
                setCpuThinking(false)
                setStartCPUMove(false)
            }
            setTimeout(()=>makeCPUMove(), 300)
            handleClose()
        }
    }, [board, cpuThinking, isGameOver, winner, startCPUMove])

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