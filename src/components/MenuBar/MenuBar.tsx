import { useContext } from 'react'
import GameIcon from '../GameIcon/GameIcon'
import MenuButton from '../MenuButton/MenuButton'
import styles from './menuBar.module.css'
import { useGameContext } from '../../context/GameContext'

export default function MenuBar() {
    const {resetGame} = useGameContext()
    return (
        <div className={styles.container}>
            <div style={{width:'25%'}}>
                <MenuButton label='MENU' onClick={()=>alert('hello')}/>
            </div>
            <div>
                <GameIcon/>
            </div>
            <div style={{width:'25%', display:'flex', justifyContent:'end'}}>
                <MenuButton label='RESTART' onClick={()=>resetGame(true)}/>
            </div>
        </div>
    )
}