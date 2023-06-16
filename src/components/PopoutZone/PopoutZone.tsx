import { useGameContext } from "../../feature/gameplay/GameContext"
import {useState} from 'react'
import styles from './PopoutZone.module.css'
import Chevron from "../Chevron/Chevron"
import { COLOR_DICT } from "../../feature/gameplay/connect4"
import { theme } from "../theme/theme"

export default function PopoutZone() {
    const {isGameOver, popout, canPopout, board, currentPlayer} = useGameContext()
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
        if (!isGameOver) popout(index)
    }

    return (
        <>
            {
                board.map((_, index) => {
                    return (
                        <div 
                            className={styles.chevrons}
                            onMouseLeave={()=>hideChevron()} 
                            onMouseEnter={()=>showChevron(index)}
                            onClick={()=>handleChevronClick(index)}
                        >
                            <div id={'popout-'+index} className={styles.chevron}>
                                {
                                    canPopout(index) &&
                                    <Chevron 
                                        colour={
                                            (chevronIsVisible && hoveredChevronIndex === index)
                                            ? COLOR_DICT[currentPlayer] 
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