import { useGameContext } from '../../feature/gameplay/GameContext'
import { COLOR_DICT, Player, EnumDictionary } from '../../feature/gameplay/connect4'
import Chevron from '../Chevron/Chevron'
import ColoredDisc from '../ColoredDisc/ColoredDisc'
import styles from './GameBoard.module.css'

type Props = {
    board:number[][]
}



export default function GameBoard(props:Props) {
    const {board, playDisc, currentPlayer} = useGameContext()

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
        document.getElementById('popout-'+index)!.style.visibility = 'visible'
    }
    function hideChevron(index:number) {
        document.getElementById('popout-'+index)!.style.visibility = 'hidden'
    }
    function handleChevronClick(index:number) {
        //popout
    }
    return (
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
                                        padding:'10%'
                                    }}
                                >
                                    <div 
                                        style={{
                                            transform:'translateY(-100%)'
                                        }}
                                    >
                                        <ColoredDisc color={COLOR_DICT[currentPlayer]} size={100}/>
                                    </div>
                                </div>
                                {
                                    col.map(row=> {
                                        
                                        return (
                                            <div className={styles.position}>
                                                <ColoredDisc size={100} color={COLOR_DICT[row as keyof EnumDictionary<Player, string>]}/>
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
                                onMouseLeave={()=>hideChevron(index)} 
                                onMouseEnter={()=>showChevron(index)}
                                onClick={()=>handleChevronClick(index)}
                            >
                                <div id={'popout-'+index} className={styles.chevron}>
                                    <Chevron currentPlayer={currentPlayer}/>
                                </div>
                            </div>
                        )
                    })
                }
            </>
        </div>
    )
}