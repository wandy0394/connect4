import { Player, COLOR_DICT, EnumDictionary } from "../../feature/gameplay/connect4"
import ColoredDisc from "../ColoredDisc/ColoredDisc"
import styles from './GameBoardCell.module.css'


type Props = {
    cellValue:number
    colIndex: number
    rowIndex:number
}
export default function GameBoardCell(props:Props) {
    const {colIndex, rowIndex, cellValue} = props
    return (
        <div id={`disc-${colIndex}-${rowIndex}`} className={styles['disc-container']}>
        <div className={styles['disc-hole']}>
            <div className={styles['disc-shadow']}>

                <ColoredDisc 
                    extraStyle={{
                        visibility: cellValue != Player.NONE ? 'visible' : 'hidden',
                        transform:'translateY(-15%)'
                    }} 
                    size={100} 
                    color={COLOR_DICT[cellValue as keyof EnumDictionary<Player, string>]}
                />
            </div>
        </div>
    </div>
    )
}