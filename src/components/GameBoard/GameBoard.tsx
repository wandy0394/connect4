import ColoredDisc from '../ColoredDisc/ColoredDisc'
import styles from './GameBoard.module.css'
type Props = {
    board:number[][]
}
export default function GameBoard(props:Props) {
    const {board} = props
    return (
        <div className={styles.gameboard}>
            {
                board.map(row=>{
                    return row.map(col=> {
                        return (
                            <div className={styles.position}>
                                <ColoredDisc size={100} color='red'>
                                    {col}
                                </ColoredDisc>
                            </div>
                        )
                    })
                })
            }
        </div>
    )
}