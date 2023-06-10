import GameIcon from '../GameIcon/GameIcon'
import MenuButton from '../MenuButton/MenuButton'
import styles from './menuBar.module.css'

export default function MenuBar() {
    return (
        <div className={styles.container}>
            <MenuButton label='MENU' onClick={()=>alert('hello')}/>
            <GameIcon/>
            <MenuButton label='RESTART'/>
        </div>
    )
}