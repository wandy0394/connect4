import GameIcon from '../GameIcon/GameIcon'
import MenuButton from '../MenuButton/MenuButton'
import styles from './menuBar.module.css'

export default function MenuBar() {
    return (
        <div className={styles.container}>
            <div style={{width:'25%'}}>
                <MenuButton label='MENU' onClick={()=>alert('hello')}/>
            </div>
            <div>
                <GameIcon/>
            </div>
            <div style={{width:'25%', display:'flex', justifyContent:'end'}}>
                <MenuButton label='RESTART'/>
            </div>
        </div>
    )
}