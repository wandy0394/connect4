import { useState } from 'react'
import styles from './MenuModal.module.css'
import { useGameContext } from '../../context/GameContext'
import { GAME_MODE } from '../../feature/gameplay/connect4'

type Props = {
    visible:boolean
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
}

enum PAGES {
    GAME_MODE="GAME_MODE",
    GAME_RULES = "GAME_RULES"
}

export default function MenuModal(props:Props) {
    const {visible, setVisible} = props
    const {setGameMode, resetGame} = useGameContext()
    const [pages, setPages] = useState<PAGES>(PAGES.GAME_MODE)
    function handlePvPClick() {
        resetGame(true)
        setGameMode(GAME_MODE.PLAYER_VS_PLAYER)
        handleCloseClick()
    }
    function handlePvCPUClick() {
        resetGame(true)
        setGameMode(GAME_MODE.PLAYER_VS_CPU)
        handleCloseClick()
    }
    function handleGameRulesClick() {
        setPages(PAGES.GAME_RULES)
    }


    function handleBackClick() {
        setPages(PAGES.GAME_MODE)
    }

    function handleCloseClick() {
        setVisible(false)
        setPages(PAGES.GAME_MODE)
    }

    return (
        <div 
            style={{display: visible?'block':'none'}} 
            className={styles['modal']}
        >
            <div
                style={{display: visible?'block':'none'}}  
                className={`${styles['modal-size']} ${styles['modal-content']}`}
            >
                <div className={styles['buttons']}>
                {
                    (pages === PAGES.GAME_MODE) && 
                    <>
                        <div 
                            className={`${styles['modal-button']} ${styles['button-primary']}`} 
                            onClick={handlePvPClick}
                        >
                            PLAYER vs PLAYER
                        </div>
                        <div 
                            className={`${styles['modal-button']} ${styles['button-secondary']}`} 
                            onClick={handlePvCPUClick}
                        >
                            PLAYER vs CPU
                        </div>
                        <div 
                            className={`${styles['modal-button']} ${styles['button-white']}`} 
                            onClick={handleGameRulesClick}
                        >
                            GAME RULES
                        </div>
                    </>
                }
                {
                    (pages === PAGES.GAME_RULES) && 
                    <>
                        <div 
                            className={`${styles['rules-summary']}`} 
                        >
                            <p>Players take turns placing one disc in a column.</p>
                            <p>The first player to get four discs in a row either horizontally, vertically or diagonally is the winner.</p>
                            <p>If a column has at least 3 discs, a player may choose to POPOUT instead of dropping a disc</p>
                            <p>POPOUT: The disc at the bottom row of the target column is popped out and all discs in that column drop down 1 row</p>
                            <p>Winnning scores 1 point for the winner</p>
                            <p>Drawing scores no points for anyone</p>
                        </div>
                        <div 
                            className={`${styles['modal-button']} ${styles['button-white']}`} 
                            onClick={handleBackClick}
                        >
                            BACK
                        </div>
                    </>
                }
                {
                    <div 
                        className={`${styles['modal-button']} ${styles['button-white']}`}
                        onClick={handleCloseClick}
                        >
                        CLOSE
                    </div>
                }

                </div>
            </div>
        </div>
    )
}