import { useState } from 'react'
import styles from './MenuModal.module.css'
import { GAME_MODE } from '../../feature/gameplay/connect4'
import FirstPlayerSelectMenu from './FirstPlayerSelectMenu'

type Props = {
    visible:boolean
    setVisible:React.Dispatch<React.SetStateAction<boolean>>
    startingPage:PAGES
}

export enum PAGES {
    GAME_MODE = "GAME_MODE",
    GAME_RULES = "GAME_RULES",
    PVP_MENU = "PVP_MENU",
    PVC_MENU = "PVC_MENU"
}

export default function MenuModal(props:Props) {
    const {visible, setVisible, startingPage} = props
    const [pages, setPages] = useState<PAGES>(startingPage)
    
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
                            onClick={()=>setPages(PAGES.PVP_MENU)}
                        >
                            PLAYER vs PLAYER
                        </div>
                        <div 
                            className={`${styles['modal-button']} ${styles['button-secondary']}`} 
                            onClick={()=>setPages(PAGES.PVC_MENU)}
                        >
                            PLAYER vs CPU
                        </div>
                        <div 
                            className={`${styles['modal-button']} ${styles['button-white']}`} 
                            onClick={()=>setPages(PAGES.GAME_RULES)}
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
                            <p>If a column has at least 3 discs, a player may choose to POPOUT instead of dropping a disc.</p>
                            <p>POPOUT: The disc at the bottom row of the target column is popped out and all discs in that column drop down 1 row.</p>
                            <p>Winnning scores 1 point for the winner.</p>
                            <p>Drawing scores no points for anyone.</p>
                            <p>After clicking 'Play Again', loser goes first.</p>
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
                    (pages === PAGES.PVP_MENU) &&
                    <>
                        <FirstPlayerSelectMenu 
                            handleBack={handleBackClick} 
                            handleClose={handleCloseClick}
                            gameMode={GAME_MODE.PLAYER_VS_PLAYER}
                        />
                    </>
                }
                                {
                    (pages === PAGES.PVC_MENU) &&
                    <>
                        <FirstPlayerSelectMenu 
                            handleBack={handleBackClick} 
                            handleClose={handleCloseClick}
                            gameMode={GAME_MODE.PLAYER_VS_CPU}
                        />
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