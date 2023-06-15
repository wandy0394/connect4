import { useGameContext } from '../../feature/gameplay/GameContext'
import { COLOR_DICT, Player, EnumDictionary } from '../../feature/gameplay/connect4'
import Chevron from '../Chevron/Chevron'
import ColoredDisc from '../ColoredDisc/ColoredDisc'
import { theme } from '../theme/theme'
import styles from './GameBoard.module.css'
import {useState} from 'react'





export default function GameBoard() {
    const {board, playDisc, currentPlayer, canPopout, popout, findNewDiscPosition, isGameOver} = useGameContext()
    const [chevronIsVisible, setChevronIsVisible] = useState<boolean>(false)
    const [hoveredChevronIndex, setHoveredChevronIndex] = useState<number>(-1)
    const [animate, setAnimate] = useState<boolean>(false)
    const [selectedColumn, setSelectedColumn] = useState<number>(-1)

    function showDiscCursor(index:number) {
        if (!animate) setSelectedColumn(index)
    }

    function hideDiscCursor(index:number) {
        if (!animate) setSelectedColumn(-1)
    }
    function handleColumClick(column:number) {
        let row = findNewDiscPosition(column)
        if (row >= 0 && !isGameOver) {
            let discId = `disc-${column}-${row}`
            let dropDiscId = `drop-disc-${column}`
            let rowTop = document.getElementById(discId)?.getBoundingClientRect()
            let discHeight = document.getElementById(dropDiscId)?.getBoundingClientRect()
            let lowestDiscHeight = document.getElementById(`disc-0-${board[0].length-1}`)?.getBoundingClientRect()
            if (rowTop && discHeight && lowestDiscHeight) {
                let newTop = Math.floor(rowTop.y - discHeight.y) + 'px'
                document.documentElement.style.setProperty('--disc-end-height', newTop) 
                
                let newAnimationTime = Math.floor(300 * (rowTop.y/ lowestDiscHeight.y )) + 'ms'
                document.documentElement.style.setProperty('--animation-time', newAnimationTime) 
                console.log(newAnimationTime)
                // console.log(document.documentElement.style.getPropertyValue('--disc-end-height'))
                setSelectedColumn(column)
                setAnimate(true)
            }
        }
    }

    function resolveAnimation(column:number) {
        playDisc(column)
        setAnimate(false)
        setSelectedColumn(-1)
    }

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
        <div className={styles['gameboard-container']}>
            <div style ={{
                display:'grid',
                gridTemplateColumns: 'repeat(7, 1fr)'
            }}>
            {
                board.map((_, index) => {
                    return (
                        <div 
                            id={'drop-disc-' + index} 
                            style={{
                                height:'10px',
                                visibility: (selectedColumn === index) ? 'visible':'hidden',
                            }}
                        >
                        <div 
                            // className={styles['dropping-disc']}
                            className={`
                                ${styles['dropping-disc']} 
                                ${(animate && selectedColumn === index) 
                                    && styles['start-drop-animation']}
                            `}
                            onAnimationEnd={()=>resolveAnimation(index)}
                        >
                            <ColoredDisc color={COLOR_DICT[currentPlayer]} size={100}/>
                        </div>
                    </div>
                    )
                })
            }
            </div>
            <div className={styles.gameboard}>
            <>
                {
                    board.map((col, colIndex)=>{
                        return (
                            <div 
                                id={'column-container-'+colIndex}
                                className={styles.column} 
                                onMouseLeave={()=>hideDiscCursor(colIndex)} 
                                onMouseEnter={()=>showDiscCursor(colIndex)}
                                onClick={()=>handleColumClick(colIndex)}
                            >
                                {
                                    col.map((row, rowIndex)=> {
                                        
                                        return (
                                            <div  className={styles['disc-container']}>
                                                <div className={styles['disc-hole']}>
                                                    <div className={styles['disc-shadow']}>

                                                        <ColoredDisc 
                                                            id={`disc-${colIndex}-${rowIndex}`}
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