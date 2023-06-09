import { Player } from "../../feature/gameplay/connect4"
import { PLAYER_COLORS, EnumDictionary } from "../../theme/theme"
import ColoredDisc from "../ColoredDisc/ColoredDisc"
import styles from './GameBoardCell.module.css'


type Props = {
    cellValue:number
    colIndex: number
    rowIndex:number
    [rest:string]:any

}
export default function GameBoardCell(props:Props) {
    const {colIndex, rowIndex, cellValue, ...rest} = props
    return (
        <div {...rest} className={styles['disc-container']}>
            <div className={styles['disc-hole']}>
                <div className={styles['disc-shadow']}/>
                <ColoredDisc 
                    extraStyle={{
                        visibility: cellValue != Player.NONE ? 'visible' : 'hidden',
                        position:'absolute',
                        zIndex:3,
                    }} 
                    size={100} 
                    color={PLAYER_COLORS[cellValue as keyof EnumDictionary<Player, string>]}
                />
            </div>
        </div>
    )
}