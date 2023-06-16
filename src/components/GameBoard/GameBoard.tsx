import { useGameContext } from '../../feature/gameplay/GameContext'
import { COLOR_DICT, Player, EnumDictionary } from '../../feature/gameplay/connect4'
import ColoredDisc from '../ColoredDisc/ColoredDisc'
import GameBoardCell from '../GameBoardCell/GameBoardCell'
import PopoutZone from '../PopoutZone/PopoutZone'
import styles from './GameBoard.module.css'
import {useState} from 'react'



const ANIMATION_TIME_MS = 200

export default function GameBoard() {
    const {board, playDisc, currentPlayer, findNewDiscPosition, isGameOver} = useGameContext()
    const [animate, setAnimate] = useState<boolean>(false)
    const [selectedColumn, setSelectedColumn] = useState<number>(-1)

    function showDiscCursor(index:number) {
        if (!animate) setSelectedColumn(index)
    }

    function hideDiscCursor() {
        if (!animate) setSelectedColumn(-1)
    }
    function handleColumClick(column:number) {
        let row = findNewDiscPosition(column)
        if (row >= 0 && !isGameOver && !animate) {
            let targetDiscId = `disc-${column}-${row}`
            let dropDiscId = `drop-disc-${column}`
            let targetRow = document.getElementById(targetDiscId)?.getBoundingClientRect()
            let discHeight = document.getElementById(dropDiscId)?.getBoundingClientRect()
            let lowestDiscHeight = document.getElementById(`disc-0-${board[0].length-1}`)?.getBoundingClientRect()
            if (targetRow && discHeight && lowestDiscHeight) {
                let newTop = Math.floor(targetRow.y - discHeight.y) + 'px'
                // let newTop = Math.floor(targetRow.y - discHeight.y) + 'px'
                document.documentElement.style.setProperty('--disc-end-height', newTop) 
                
                let newAnimationTime = Math.floor(ANIMATION_TIME_MS * (targetRow.y/ lowestDiscHeight.y )) + 'ms'
                document.documentElement.style.setProperty('--animation-time', newAnimationTime) 
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

    return (
        <>
            <div style ={{
                display:'grid',
                gridTemplateColumns: 'repeat(7, 1fr)',
                paddingLeft:'2%',
                paddingRight:'2%',
                width:'100%',
                transform:'translateY(50%)',
            }}>
                {
                    board.map((_, index) => {
                        return (
                            <div 
                                id={'drop-disc-' + index} 
                                style={{
                                    visibility: (selectedColumn === index) ? 'visible':'hidden',
                                }}
                            >
                                <div 
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
            <div className={styles['gameboard-container']}>

                <div className={styles.gameboard}>
                <>
                    {
                        board.map((col, colIndex)=>{
                            return (
                                <div 
                                    id={'column-container-'+colIndex}
                                    className={styles.column} 
                                    onMouseLeave={()=>hideDiscCursor()} 
                                    onMouseEnter={()=>showDiscCursor(colIndex)}
                                    onClick={()=>handleColumClick(colIndex)}
                                >
                                    {
                                        col.map((value, rowIndex)=> {
                                            return (
                                                <GameBoardCell 
                                                    colIndex={colIndex} 
                                                    rowIndex={rowIndex} 
                                                    cellValue={value}
                                                />
                                            )
                                        })

                                    }
                                </div>
                            ) 
                        })
                        
                    }
                </>
                <PopoutZone/>
                </div>
            </div>
        </>

    )
}