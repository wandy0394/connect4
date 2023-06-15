import { useGameContext } from '../../feature/gameplay/GameContext'
import { COLOR_DICT, Player, EnumDictionary } from '../../feature/gameplay/connect4'
import Chevron from '../Chevron/Chevron'
import ColoredDisc from '../ColoredDisc/ColoredDisc'
import { theme } from '../theme/theme'
import styles from './GameBoard.module.css'
import {useState} from 'react'





export default function GameBoard() {
    const {board, playDisc, currentPlayer, canPopout, popout} = useGameContext()
    const [chevronIsVisible, setChevronIsVisible] = useState<boolean>(false)
    const [hoveredChevronIndex, setHoveredChevronIndex] = useState<number>(-1)
    function showDiscCursor(index:number) {
        document.getElementById('col-'+index)!.style.visibility = 'visible'
    }

    function hideDiscCursor(index:number) {
        document.getElementById('col-'+index)!.style.visibility = 'hidden'
    }
    function handleColumClick(column:number) {
        playDisc(column)
    }

    function showChevron(index:number) {
        // document.getElementById('popout-'+index)!.style.visibility = 'visible'
        setChevronIsVisible(true)
        setHoveredChevronIndex(index)
    }
    function hideChevron() {
        // document.getElementById('popout-'+index)!.style.visibility = 'hidden'
        setHoveredChevronIndex(-1)
        setChevronIsVisible(false)
    }
    function handleChevronClick(index:number) {
        popout(index)
    }
    return (
        <div className={styles['gameboard-container']}>
            <div className={styles.gameboard}>
            <>
                {
                    board.map((col, index)=>{
                        return (
                            <div 
                                className={styles.column} 
                                onMouseLeave={()=>hideDiscCursor(index)} 
                                onMouseEnter={()=>showDiscCursor(index)}
                                onClick={()=>handleColumClick(index)}
                            >
                                <div 
                                    id={'col-' + index} 
                                    style={{
                                        height:0,
                                        visibility:'hidden',
                                    }}
                                >
                                    <div 
                                        style={{
                                            transform:'scale(80%) translateY(-40%)',
                                            position:'relative',
                                            zIndex:-1
                                        }}
                                    >
                                        <ColoredDisc color={COLOR_DICT[currentPlayer]} size={100}/>
                                    </div>
                                </div>
                                {
                                    col.map(row=> {
                                        
                                        return (
                                            <div className={styles['disc-container']}>
                                                <div className={styles['disc-hole']}>
                                                    <div className={styles['disc-shadow']}>

                                                        <ColoredDisc 
                                                            extraStyle={{
                                                                visibility: row != Player.NONE ? 'visible' : 'hidden',
                                                                transform:'translateY(-15%)'
                                                            }} 
                                                            size={100} 
                                                            color={COLOR_DICT[row as keyof EnumDictionary<Player, string>]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })

                                }
                            </div>
                        ) 
                    })
                    
                }
            </>
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
            </div>
        </div>
    )
}