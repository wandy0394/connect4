import { COLOR_DICT, Player } from "../../feature/gameplay/connect4"
import styles from './chevron.module.css'
type Props = {
    colour:string
}

export default function Chevron(props:Props) {
    const {colour} = props
    return (
        <div className={styles.chevronContainer}>
            <div 
                style={{
                    backgroundColor: colour
                }}
                className={styles.chevron}
            />
        </div>
    )
}