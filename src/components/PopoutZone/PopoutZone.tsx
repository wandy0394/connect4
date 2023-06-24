import { GameState, useGameContext } from "../../context/GameContext"
import {useState} from 'react'
import styles from './PopoutZone.module.css'
import Chevron from "../Chevron/Chevron"
import { GAME_MODE, canPopout } from "../../feature/gameplay/connect4"
import { PLAYER_COLORS, theme } from "../../theme/theme"

export default function PopoutZone() {
    const {isGameOver, popout, board, currentPlayer, CPUMove, gameMode} = useGameContext()
    const [hoveredChevronIndex, setHoveredChevronIndex] = useState<number>(-1)
    const [chevronIsVisible, setChevronIsVisible] = useState<boolean>(false)

    function showChevron(index:number) {
        setChevronIsVisible(true)
        setHoveredChevronIndex(index)
    }
    function hideChevron() {
        setHoveredChevronIndex(-1)
        setChevronIsVisible(false)
    }
    function handleChevronClick(index:number) {
        function makeCPUMove(gameState:GameState) {
            if (gameState && !gameState.isGameOver && gameMode === GAME_MODE.PLAYER_VS_CPU) {
                CPUMove(gameState.board)
            }
        }
        if (!isGameOver) {
            let gameState:GameState = popout(index, board)
            setTimeout(()=>makeCPUMove(gameState), 250)
        }
    }

    return (
        <>
            {
                board.map((_, index) => {
                    return (
                        <div 
                            key={`popout-chevron-key-${index}`}
                            className={styles.chevrons}
                            onMouseLeave={()=>hideChevron()} 
                            onMouseEnter={()=>showChevron(index)}
                            onClick={()=>handleChevronClick(index)}
                        >
                            <div id={'popout-'+index} className={styles.chevron}>
                                {
                                    canPopout(board, index) &&
                                    <Chevron 
                                        colour={
                                            (chevronIsVisible && hoveredChevronIndex === index)
                                            ? PLAYER_COLORS[currentPlayer] 
                                            : theme.neutralDarkGray
                                        }
                                    />
                                }
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}