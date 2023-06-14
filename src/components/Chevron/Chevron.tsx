import { COLOR_DICT, Player } from "../../feature/gameplay/connect4"
import styles from './chevron.module.css'
type Props = {
    currentPlayer:Player
}

export default function Chevron(props:Props) {
    const {currentPlayer} = props
    return (
        <div className={styles.chevronContainer}>
            <div 
                style={{
                    background:`linear-gradient(to right top, ${COLOR_DICT[currentPlayer]} 50%, transparent 50%)`
                }}
                className={styles.chevron}
            />
        </div>
    )
}