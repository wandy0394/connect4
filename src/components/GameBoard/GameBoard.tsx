import { GameState, useGameContext } from '../../context/GameContext'
import { GAME_MODE, getNewDiscRow } from '../../feature/gameplay/connect4'
import DiscDropZone from '../DiscDropZone/DiscDropZone'
import GameBoardCell from '../GameBoardCell/GameBoardCell'
import PopoutZone from '../PopoutZone/PopoutZone'
import styles from './GameBoard.module.css'
import {useState} from 'react'



const ANIMATION_TIME_MS = 200

export default function GameBoard() {
    const {board, playDisc, isGameOver, currentPlayer, gameMode, CPUMove, cpuThinking, setCpuThinking} = useGameContext()
    const [animate, setAnimate] = useState<boolean>(false)
    const [selectedColumn, setSelectedColumn] = useState<number>(-1)
    // const [cpuThinking, setCpuThinking] = useState<boolean>(false)

    function showDiscCursor(index:number) {
        if (!animate && !cpuThinking) setSelectedColumn(index)
    }

    function hideDiscCursor() {
        if (!animate && !cpuThinking) setSelectedColumn(-1)
    }
    function handleColumClick(column:number) {
        if (cpuThinking) return
        let row = getNewDiscRow(board, column)
        //calculate height to drop disc and animation time
        if (row >= 0 && !isGameOver && !animate) {
            let targetRow = document.getElementById(`cell-${column}-${row}`)?.getBoundingClientRect()
            let discHeight = document.getElementById(`drop-disc-zone`)?.getBoundingClientRect()
            //obtain height of bottom row of cells
            let lowestDiscHeight = document.getElementById(`cell-0-${board[0].length-1}`)?.getBoundingClientRect()

            if (targetRow && discHeight && lowestDiscHeight) {
                let newTop = Math.floor(targetRow.y - discHeight.y) + 'px'
                document.documentElement.style.setProperty('--disc-end-height', newTop) 
                
                let newAnimationTime = Math.floor(ANIMATION_TIME_MS * (targetRow.y/ lowestDiscHeight.y )) + 'ms'
                document.documentElement.style.setProperty('--animation-time', newAnimationTime) 
                setSelectedColumn(column)
                setAnimate(true)
            }
        }
    }

    function resolveAnimation(column:number) {

        let gameState:GameState = playDisc(board, column, currentPlayer)
        setAnimate(false)
        setSelectedColumn(-1)
        if (gameMode === GAME_MODE.PLAYER_VS_CPU) {
            setCpuThinking(true)
            function makeCPUMove(gameState:GameState) {
                if (gameState && !gameState.isGameOver) {
                    CPUMove(gameState.board)
                    setCpuThinking(false)
                }
            }
            setTimeout(()=>makeCPUMove(gameState), 250)
        }
    }

    return (
        <div>
            <DiscDropZone 
                id={'drop-disc-zone'} 
                animate={animate} 
                resolveAnimation={resolveAnimation} 
                selectedColumn={selectedColumn}
            />
            <div className={styles['gameboard-container']}>
                <div className={styles.gameboard}>
                <>
                    {
                        board.map((col, colIndex)=>{
                            return (
                                <div 
                                    id={'column-container-'+colIndex}
                                    key={'column-container-'+colIndex}
                                    className={styles.column} 
                                    onMouseLeave={()=>hideDiscCursor()} 
                                    onMouseEnter={()=>showDiscCursor(colIndex)}
                                    onClick={()=>handleColumClick(colIndex)}
                                >
                                    {
                                        col.map((value, rowIndex)=> {
                                            return (
                                                <GameBoardCell 
                                                    id={`cell-${colIndex}-${rowIndex}`} 
                                                    key={`cell-key-${colIndex}-${rowIndex}`} 
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
        </div>
    )
}