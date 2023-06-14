import { useGameContext } from '../../feature/gameplay/GameContext'
import { COLOR_DICT, Player, EnumDictionary } from '../../feature/gameplay/connect4'
import ColoredDisc from '../ColoredDisc/ColoredDisc'
import styles from './GameBoard.module.css'

type Props = {
    board:number[][]
}



export default function GameBoard(props:Props) {
    const {board, playDisc} = useGameContext()

    function showChevron(index:number) {
        document.getElementById('col-'+index)!.style.visibility = 'visible'
    }

    function hideChevron(index:number) {
        document.getElementById('col-'+index)!.style.visibility = 'hidden'
    }
    function handleColumClick(column:number) {
        playDisc(column)
    }
    return (
        <div className={styles.gameboard}>
            {
                board.map((col, index)=>{
                    return (
                        <div 
                            className={styles.column} 
                            onMouseLeave={()=>hideChevron(index)} 
                            onMouseEnter={()=>showChevron(index)}
                            onClick={()=>handleColumClick(index)}
                        >
                            <div id={'col-' + index} style={{display:'flex', justifyContent:'center', visibility:'hidden'}}>V</div>
                            {
                                col.map(row=> {
                                    
                                    return (
                                        
                                        <div className={styles.position}>
                                            <ColoredDisc size={100} color={COLOR_DICT[row as keyof EnumDictionary<Player, string>]}>
                                                
                                            </ColoredDisc>
                                        </div>
                                    )
                                })

                            }
                        </div>
                    ) 
                })
            }
        </div>
    )
}