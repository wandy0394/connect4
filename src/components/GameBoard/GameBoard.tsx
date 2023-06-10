import { useGameContext } from '../../feature/gameplay/GameContext'
import { Player } from '../../feature/gameplay/connect4'
import ColoredDisc from '../ColoredDisc/ColoredDisc'
import { theme } from '../theme/theme'
import styles from './GameBoard.module.css'
type Props = {
    board:number[][]
}

type EnumDictionary<T extends string | number, U> = {
    [key in T]:U
}

const COLOR_DICT:EnumDictionary<Player, string> = {
    [Player.NONE]: 'gray',
    [Player.PLAYER1]: theme.primaryColor,
    [Player.PLAYER2]: theme.secondaryColor,
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